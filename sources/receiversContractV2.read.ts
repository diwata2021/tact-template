import * as fs from "fs";
import * as path from "path";
import { Address, contractAddress } from "@ton/core";
import { TonClient4 } from "@ton/ton";
import { ReceiversV2 } from "./output/sample_ReceiversV2";
import { prepareTactDeployment } from "@tact-lang/deployer";

(async () => {
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com", // 🔴 Test-net API endpoint
    });

    // Parameters
    let testnet = true;
    let packageName = "sample_ReceiversV2.pkg";
    let init = await ReceiversV2.init();
    let contract_address = contractAddress(0, init);

    // Prepareing
    console.log("Reading Contract Info...");
    console.log(contract_address);

    // Input the contract address
    let contract = await ReceiversV2.fromAddress(contract_address);
    let contract_open = await client.open(contract);
    console.log("Value: " + (await contract_open.getValue()));
})();
