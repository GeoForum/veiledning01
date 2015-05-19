# Server for test

## Sett opp simpel lokal http server

1. Installer [NodeJS](https://nodejs.org/) på din pc - finnes både for Window, Mac og Linux.

2. Åpen terminal og naviger til mappen hvor dette eksemplet ligger, fx:
```sh
cd /sti/til/mappe/med/veiledning
```

3. Skriv følgende kommando:
```sh
npm install
```
  NodeJS vil da installere nødvendige moduler automatisk basert på filen package.json.

4. Skriv følgende kommando:
```sh
node srv
```

5. Ditt test-site er live - gå til følgende adresse i din nettleser: <br>
  http://localhost:9001/ <br>
  Du kan endre til et annet port-nummer i filen srv.js hvis du ønsker det.

6. Serveren stoppes igjen med CTRL+C.

