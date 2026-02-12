import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { doctor } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const prompt = `You are a healthcare insights assistant. Based on the following homeopathic doctor's profile, provide helpful AI insights for patients considering this doctor.

Doctor Profile:
- Name: ${doctor.name}
- Specialty: ${doctor.specialty}
- Hospital/Clinic: ${doctor.hospital}
- Experience: ${doctor.experience}
- Rating: ${doctor.rating}/5 (${doctor.reviews} reviews)
- Qualifications: ${doctor.qualifications?.join(", ") || "BHMS, DHMS"}
- Location: ${doctor.location}
- Fee: ${doctor.fee || "৳500"}

Provide a brief, helpful analysis (max 3-4 paragraphs) covering:
1. A summary of why this doctor might be a good choice
2. What patients can expect during consultation
3. Any tips for getting the most out of the appointment

Keep the tone professional, warm, and informative. Focus on homeopathic care principles.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are a helpful healthcare insights assistant specializing in homeopathic medicine. Provide clear, professional, and encouraging insights to help patients make informed decisions." },
          { role: "user", content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to get AI insights");
    }

    const data = await response.json();
    const insights = data.choices?.[0]?.message?.content;

    return new Response(JSON.stringify({ insights }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in doctor-ai-insights:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
