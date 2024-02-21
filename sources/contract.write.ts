import { Address, contractAddress, toNano } from "@ton/core";
import { TonClient4, WalletContractV4 } from "@ton/ton";
import { SampleTactContract } from "./output/sample_SampleTactContract";
import { mnemonicToPrivateKey } from "@ton/crypto";

const Sleep = (ms: number)=> {
    return new Promise(resolve=>setTimeout(resolve, ms))
}

(async () => {
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com", // 🔴 Test-net API endpoint
    });

    // open wallet v4 (notice the correct wallet version here)
    const mnemonic = "minute bottom roast endless maximum lake unknown mouse pill tired prison giraffe endless elite analyst develop suspect purse lecture banana predict potato leisure symptom";
    const key = await mnemonicToPrivateKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
    let balance = wallet.getBalance.call;
    // open wallet and read the current seqno of the wallet
    const walletContract = client.open(wallet);
    const walletSender = walletContract.sender(key.secretKey);

    // open the contract address
    let owner = Address.parse("0QAOGWuHwLO78FY9W4rk1hbMdI_kQKIEqAWRwmbu47mxanoj");
    let init = await SampleTactContract.init(owner);
    let contract_address = contractAddress(0, init);
    let contract = await SampleTactContract.fromAddress(contract_address);
    let contract_open = await client.open(contract);
    console.log("contract:",contract_address);
    // send message to contract
    // await contract_open.send(walletSender, { value: toNano(1) }, "increment");
    
    // await Sleep(3000);
    // console.log("Counter Value: " + (await contract_open.getCounter()));


    await contract_open.send(walletSender, { value: toNano(1) }, "diwata2021");
    
})();

