import { auditBuildAssets } from "./deployment-assets.ts";
const result = await auditBuildAssets({ directory: "wordle-clone/dist", deploymentUrl: "https://samuelasherrivello-com-ai.github.io/babylon-lite-candordle/", obsoleteBases: ["/babylon-lite-wordle-game-clone/"] });
if (result.failures.length) throw new Error(result.failures.join("\n"));
console.log("Production asset paths checked:", result.checked.length);
