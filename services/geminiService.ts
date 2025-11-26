import { GoogleGenAI, Type } from "@google/genai";
import { FormData, GeminiResponse } from '../types';

export const generateNames = async (data: FormData, apiKey: string): Promise<GeminiResponse> => {
  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });

  const prompt = `
    ทำหน้าที่เป็นผู้เชี่ยวชาญด้านการตั้งชื่อเด็กยุคใหม่ และโหราศาสตร์ไทย (หลักทักษาปกรณ์):
    
    ข้อมูล:
    - ชื่อเล่นพ่อ: "${data.fatherName}"
    - ชื่อเล่นแม่: "${data.motherName}"
    - วันเกิดเด็ก (หรือกำหนดคลอด): ${data.birthDate}
    - เพศ: ${data.gender}
    - สไตล์ที่ชอบ: ${data.style || 'ทันสมัย, เท่ๆ, อินเตอร์'}

    งานที่ต้องทำ:
    1. วิเคราะห์วันเกิดเพื่อหาตัวอักษรที่เป็น "เดช", "ศรี", "มนตรี" (มงคล) และ "กาลกิณี" (กาลกิณีต้องห้ามเด็ดขาด)
    2. คิดชื่อเล่นลูก 5 ชื่อ โดยมีเกณฑ์ดังนี้:
       - ต้องมีความคล้องจองหรือผสมผสานเสียงจากชื่อพ่อและแม่ (Creative Combination)
       - ต้องหลีกเลี่ยงอักษรกาลกิณีตามวันเกิดอย่างเคร่งครัด
       - ชื่อต้องฟังดูทันสมัย (Modern), เท่ (Cool), หรือมีความหมายดี
    3. อธิบายความหมายและความเป็นมงคลของแต่ละชื่อ

    Output JSON Format Only.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      temperature: 0.8,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          suggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "ชื่อเล่นที่แนะนำ" },
                meaning: { type: Type.STRING, description: "ความหมายของชื่อ" },
                origin: { type: Type.STRING, description: "ที่มาของการผสมคำ หรือรากศัพท์" },
                auspiciousness: { type: Type.STRING, description: "คำอธิบายความเป็นมงคล (เช่น มีอักษรศรีนำหน้า)" },
                score: { type: Type.NUMBER, description: "คะแนนความเหมาะสม (80-100)" }
              },
              required: ["name", "meaning", "origin", "auspiciousness", "score"]
            }
          },
          summary: {
            type: Type.STRING,
            description: "บทสรุปสั้นๆ เกี่ยวกับหลักเกณฑ์การตั้งชื่อในครั้งนี้ (เช่น ห้ามใช้อักษรตัวไหน)"
          }
        },
        required: ["suggestions", "summary"]
      }
    }
  });

  if (!response.text) {
    throw new Error("No response from AI");
  }

  return JSON.parse(response.text) as GeminiResponse;
};