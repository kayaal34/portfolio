import { useDocumentTitle, useI18n } from '../i18n';
import { ChapterIndex } from '../components/ChapterIndex';
import { Hero } from '../sections/Hero';

/**
 * The opening screen, and nothing below it: who I am on the left, the four
 * chapters of the CV on the right. Pressing a chapter opens its own page.
 *
 * One screen tall on wide displays, so it reads as a title page rather than
 * the top of a long document. On a phone the two halves stack.
 */
export function Home() {
  const { t } = useI18n();
  useDocumentTitle(t.meta.title);

  return (
    <div className="mx-auto grid min-h-[100svh] w-full max-w-[76rem] content-center gap-16 px-[clamp(1.25rem,6vw,3.25rem)] pt-28 pb-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-24 lg:py-24">
      <Hero />
      <ChapterIndex />
    </div>
  );
}
