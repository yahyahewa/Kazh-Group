import { redirect } from "next/navigation";

export default function Projects({ params: { locale } }: { params: { locale: string } }) {
    redirect(`/${locale}`);
}
