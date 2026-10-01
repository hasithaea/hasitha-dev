import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Hasitha Amarasinghe - roles, projects, or technical questions.",
};

export default function ContactPage() {
  return (
    <PageShell footer={<Footer variant="compact" />}>
      <ContactForm />
    </PageShell>
  );
}