import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

export default function Contact() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(contactSchema) });

  const onSubmit = (data) => {
    console.info("Contact form", data);
    toast({
      title: "Message sent",
      description: "Our team will get back to you shortly.",
    });
    reset();
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-200 via-white to-amber-200" />
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-20">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[32px] border border-amber-500/40 bg-white/80 p-10 text-center backdrop-blur-xl shadow-[0_20px_60px_rgba(148,89,16,0.2)]"
        >
          <p className="text-xs uppercase tracking-[0.5em] text-amber-800/80">
            Let’s Talk
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-amber-900">
            Book a Session with the Urban Store Team
          </h1>
          <p className="mt-6 text-sm text-amber-900/80">
            Whether you’re scouting custom styling, retail collaborations, or
            press inquiries—we’ll tailor the conversation to your needs. Drop a
            message and we’ll respond within 48 hours.
          </p>
        </motion.section>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.form
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 h-fit rounded-[32px] border border-amber-500/40 bg-white/90 p-10 backdrop-blur-xl shadow-[0_18px_50px_rgba(148,89,16,0.18)]"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-amber-900">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Jordan Fox"
                  className="rounded-full border-amber-300/60 bg-white text-amber-900"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-amber-900">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="rounded-full border-amber-300/60 bg-white text-amber-900"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-amber-900">
                Message
              </Label>
              <textarea
                id="message"
                placeholder="Tell us about your project, event, or idea."
                className="min-h-[160px] w-full rounded-3xl border border-amber-300/60 bg-white p-4 text-sm text-amber-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60"
                {...register("message")}
              />
              {errors.message && (
                <p className="text-xs text-red-500">{errors.message.message}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-[#FF6600] py-3 text-white hover:bg-[#ff7a26]"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </motion.form>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="rounded-[28px] border border-amber-500/30 bg-white/90 p-8 backdrop-blur-xl shadow-[0_16px_40px_rgba(148,89,16,0.18)]">
              <h2 className="text-xl font-semibold tracking-tight text-amber-900">
                Visit the Urban Lab
              </h2>
              <p className="mt-3 text-sm text-amber-900/80">
                340 Market Street
                <br /> SoHo, NYC 10013
              </p>
              <div className="mt-6 space-y-3 text-sm text-amber-900/80">
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  urban.pluse.store@gmail.com
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> +20 010 66 39
                  8472
                </p>
                <p>
                  <span className="font-semibold">Hours:</span> Tue – Sun, 11AM
                  – 8PM
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.4em] text-amber-900/70">
                <span className="rounded-full border border-amber-400/40 px-3 py-1">
                  Styling Appointments
                </span>
                <span className="rounded-full border border-amber-400/40 px-3 py-1">
                  Press Preview
                </span>
                <span className="rounded-full border border-amber-400/40 px-3 py-1">
                  Collab Pitch
                </span>
              </div>
            </div>
            <div className="overflow-hidden rounded-[28px] border border-amber-500/40 backdrop-blur-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3453.192974668097!2d31.3046370867493!3d30.060002553169394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDAzJzM2LjAiTiAzMcKwMTgnMzQuMiJF!5e0!3m2!1sen!2sus!4v1762515318293!5m2!1sen!2sus"
                title="Urban Store Map"
                className="h-64 w-full border-0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="rounded-[28px] border border-amber-500/30 bg-white/80 p-6 text-center text-amber-900">
              <h3 className="text-lg font-semibold">Prefer to DM?</h3>
              <p className="mt-2 text-sm text-amber-900/80">
                Ping us on Instagram @urbanstore or WhatsApp +20 010 66 39
                8472
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
