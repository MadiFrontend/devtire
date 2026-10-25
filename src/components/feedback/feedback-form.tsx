"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveFeedback } from "@/lib/storage";

export function FeedbackForm() {
  const t = useTranslations("feedback");
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
      </div>

      {done ? (
        <div className="rounded-2xl border border-accent/30 bg-accent/10 p-6 text-sm">
          {t("success")}
        </div>
      ) : (
        <form
          className="space-y-4 rounded-2xl border border-border/80 bg-card p-6 shadow-sm"
          onSubmit={(e) => {
            e.preventDefault();
            if (!message.trim()) return;
            saveFeedback({ name, email, message });
            setDone(true);
          }}
        >
          <label className="block space-y-1.5 text-sm">
            <span>{t("name")}</span>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("placeholderName")}
            />
          </label>
          <label className="block space-y-1.5 text-sm">
            <span>{t("email")}</span>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("placeholderEmail")}
            />
          </label>
          <label className="block space-y-1.5 text-sm">
            <span>{t("message")}</span>
            <Textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("placeholderMessage")}
            />
          </label>
          <Button type="submit" className="w-full sm:w-auto">
            {t("submit")}
          </Button>
        </form>
      )}
    </div>
  );
}
