import { Address, contractAddress, toNano } from "@ton/core";
import { TonClient4, WalletContractV4 } from "@ton/ton";
import { Multiply, ReceiversV2, loadMultiply } from "./output/sample_ReceiversV2";
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
    let init = await ReceiversV2.init();
    let contract_address = contractAddress(0, init);
    let contract = await ReceiversV2.fromAddress(contract_address);
    let contract_open = await client.open(contract);
    console.log("contract:",contract_address);
    // send message to contract
    // await contract_open.send(walletSender, { value: toNano(1) }, {$$type: 'Add',amount:10n});
    // await Sleep(10000);
    // await contract_open.send(walletSender, { value: toNano(1) }, {$$type: 'Multiply',amount:10n});
    // await Sleep(10000);
    await contract_open.send(walletSender, { value: toNano(1) }, {$$type: 'Divide',amount:2n});
    console.log("Counter Value: " + (await contract_open.getValue()));    
})();

