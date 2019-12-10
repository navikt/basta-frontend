[![CircleCI](https://circleci.com/gh/navikt/basta-frontend.svg?style=svg)](https://circleci.com/gh/navikt/basta-frontend)
[![Known Vulnerabilities](https://snyk.io/test/github/navikt/basta-frontend/badge.svg?targetFile=package.json)](https://snyk.io/test/github/navikt/basta-frontend?targetFile=package.json)
[![codebeat badge](https://codebeat.co/badges/327c0214-89a0-4c40-9cb2-0e8342023cf0)](https://codebeat.co/projects/github-com-navikt-basta-frontend-master)

# Basta frontend

Basta er en selvbetjent bestillingsportal for bestilling og opprettelse av ting som virtuell maskiner, databaser, køer, brukere osv.
Dette er frontend til basta som kaller Basta APIet internt.

## Utvikling lokalt

Kjør

```console
npm install
npm run api
npm run frontend
```

### Offline modus

Basta frontend krever innlogging via Azure AD. For utvikling lokalt er det ofte ikke ønskelig med en slik integrasjon.
Det finnes en offline modus som mocker ut Azure AD.
For offline modus kjør:

```console
npm run offline
```

Api gir det et mock api som simulerer basta backend

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes til Team Aura.

For eksterne kontakt en av følgende:

- Frode Sundby (frode.sundby@nav.no)
- Mats Byfuglien (mats.byfuglien@nav.no)

For NAV-ansatte kan henvendelser sendes via slack i kanalen #aura
