# Security recovery review

Prepared 30 October 2026. Source branch: main at 57087f245cfd04251281d0d7fad1c12b441923bb.

No matching worm indicators were found in the preserved repository scan. This repair patches Next.js and dependencies and removes authentication-token and raw authentication-error logging. Authentication flow and cookie settings are preserved. Run npm run test:security for seven grouped proxy/OTP regression checks with mocked upstream responses.

Type checking and production build passed. Dependency audit: 0 reported vulnerabilities. Whole-project lint: 47 errors and 23 warnings; these are disclosed, not waived. See the private recovery evidence for full logs. Automatic dependency lifecycle scripts are disabled by .npmrc.

No real login, payments, tenant changes, invitations or production backend calls were performed. Staging integration review remains necessary before production. Historical malicious objects remain in Git history; use updated branch tips and retain investigation evidence.
