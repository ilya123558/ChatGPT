export default async function getUserNonce(address: string): Promise<string | void> {

    return fetch(`http://localhost:9000/api/user/nonce/${address}`)
        .then((response) => response.text())
        .catch((error) => console.log("Error ", error));
}