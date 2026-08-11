/**
 * Contact form delivery.
 *
 * The form posts to Web3Forms, which relays the message straight to the
 * inbox that the access key was issued to. Web3Forms access keys are
 * designed to be public (they are per-inbox, write-only and rate limited),
 * so shipping one in the client bundle is expected — it cannot be used to
 * read anything.
 *
 * Set it in `.env` at the project root:
 *
 *     VITE_WEB3FORMS_KEY=your-access-key-here
 *
 * Until a key is present the form degrades gracefully: it composes the
 * message in the visitor's own mail client instead of failing silently.
 */

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export const WEB3FORMS_ACCESS_KEY = (import.meta.env.VITE_WEB3FORMS_KEY ?? '').trim();

export const isContactFormConfigured = WEB3FORMS_ACCESS_KEY.length > 0;
