import { getTranslations } from "next-intl/server";
import { FoundationCard } from "@/components/design-system/FoundationCard";
import { PrimaryButton } from "@/components/design-system/PrimaryButton";

export default async function HomePage() {
  const t = await getTranslations();

  return (
    <main className="min-h-screen bg-background px-md py-xl text-text-primary">
      <div className="mx-auto flex max-w-2xl flex-col gap-lg">
        <section className="rounded-xl bg-surface p-lg shadow-card">
          <p className="text-sm uppercase tracking-[0.2em] text-text-secondary">{t("app.name")}</p>
          <h1 className="mt-sm text-4xl font-semibold tracking-tight">{t("event.foundation.title")}</h1>
          <p className="mt-sm max-w-xl text-base leading-7 text-text-secondary">
            {t("event.foundation.description")}
          </p>
          <div className="mt-lg">
            <PrimaryButton label={t("auth.signInWithGoogle")} />
          </div>
        </section>

        <section className="grid gap-md sm:grid-cols-2">
          <FoundationCard title={t("foundation.contracts")} body={t("foundation.contractsDescription")} />
          <FoundationCard title={t("foundation.domain")} body={t("foundation.domainDescription")} />
          <FoundationCard title={t("foundation.database")} body={t("foundation.databaseDescription")} />
          <FoundationCard title={t("foundation.i18n")} body={t("foundation.i18nDescription")} />
          <FoundationCard title={t("foundation.adapters")} body={t("foundation.adaptersDescription")} />
        </section>
      </div>
    </main>
  );
}
