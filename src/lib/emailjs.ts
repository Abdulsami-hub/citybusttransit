import emailjs from "@emailjs/browser";

export type ContactFormPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getEmailJsConfig() {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      "EmailJS is not configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY.",
    );
  }

  return { serviceId, templateId, publicKey };
}

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function validateContactForm(payload: ContactFormPayload): string | null {
  if (!payload.name.trim() || !payload.email.trim() || !payload.subject.trim() || !payload.message.trim()) {
    return "Bitte füllen Sie alle Pflichtfelder aus.";
  }

  if (!isValidEmail(payload.email)) {
    return "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
  }

  return null;
}

export async function sendContactEmail(payload: ContactFormPayload): Promise<void> {
  const { serviceId, templateId, publicKey } = getEmailJsConfig();

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        name: payload.name.trim(),
        email: payload.email.trim(),
        subject: payload.subject.trim(),
        message: payload.message.trim(),
      },
      { publicKey },
    );
  } catch (error) {
    if (error instanceof Error && error.message.includes("EmailJS is not configured")) {
      throw error;
    }

    const status = typeof error === "object" && error !== null && "status" in error
      ? Number((error as { status?: number }).status)
      : undefined;

    if (status === 0 || (error instanceof TypeError && /fetch|network/i.test(error.message))) {
      throw new Error("Netzwerkfehler. Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.");
    }

    throw new Error("Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.");
  }
}
