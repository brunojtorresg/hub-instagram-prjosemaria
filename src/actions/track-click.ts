"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const trackSchema = z.object({
  action: z.string().min(1),
  redirectUrl: z.string().url(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

type TrackInput = {
  action: FormDataEntryValue | null;
  redirectUrl: FormDataEntryValue | null;
  metadata?: Record<string, unknown>;
};

type TrackResult = {
  success: boolean;
  error?: string;
};

export async function trackAndRedirectAction(
  input: TrackInput
): Promise<TrackResult> {
  const parsed = trackSchema.safeParse({
    action: typeof input.action === "string" ? input.action : null,
    redirectUrl: typeof input.redirectUrl === "string" ? input.redirectUrl : null,
    metadata: input.metadata,
  });

  if (!parsed.success) {
    return { success: false, error: "Parâmetros inválidos" };
  }

  const { action, redirectUrl, metadata } = parsed.data;
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

  if (!tenantId) {
    return { success: false, error: "Configuração de tenant ausente" };
  }

  const supabase = await createClient();

  // Tabela correta: hub_analytics (já existe no banco)
  const { error: insertError } = await supabase.from("hub_analytics").insert({
    tenant_id: tenantId,
    action,
    metadata: metadata ?? {},
  });

  if (insertError) {
    console.error("Falha ao registrar hub_analytics:", insertError.message);
    // Não bloqueamos o checkout do usuário se o analytics falhar
  }

  // FORA do try/catch: NEXT_REDIRECT é sinal de controle do Next.js
  // e precisa propagar até o boundary da Server Action.
  redirect(redirectUrl);
}