export default async function getUserNonce(address: string): Promise<string | void> {

    return fetch(`${process.env.API_URL}/user/nonce/${address}`)
        .then((response) => response.text())
        .catch((error) => console.log("Error ", error));
}