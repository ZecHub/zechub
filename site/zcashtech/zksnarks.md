# ZKP & ZK-SNARKS

## What is a Proof?

Proofs are the basis for all mathematics. A proof is a claim or theorem you are trying to prove & sequence of derivations made to declare the theorem has been proved. eg. all angles in a triangle total 180° can be independently checked by anyone (verifier).

**Proofs** 

Prover ---> Makes Claim ---> Verifier Chooses ---> Accept/Reject 

(Both the prover and verifier are algorithms)

In computer science the term for efficiently verifiable proofs is NP proofs. These short proofs can be verified in polynomial time. The broad idea being "There exists a solution to a theorem & it is passed over to the verifier to check it"

![NP proofs](https://cdn.discordapp.com/attachments/860525418008674327/1070395089559494716/NPlanguage.jpg  "NP Language")


In an NP-language = two conditions must hold: 

Completeness: True claims will be accepted by verifier (allows honest provers to reach verification)

Soundness: False claims will have no proofs (for all cheating prover strategy they will be unable to prove correctness of incorrect claim).


### Interactive & Probabalistic Proofs

**Interaction**: Rather than just reading the proof, the verifier engages with a prover back and forth over several message rounds.

**Randomness**: Verifier's requests to prover are randomised and prover must be able to answer correctly to each. 

![IP proofs](https://cdn.discordapp.com/attachments/860525418008674327/1070395089194594345/IPmodel.jpg  "IP protocol")

Using interaction and randomness together it is possible to prove a claim to a blind verifier in Probabilistic Polynomial Time (PPT). 

Can Interactive Proofs efficiently verify more than NP proofs?

NP Proofs vs IP proofs:

|  Statement   |    NP     | IP    |
|--------------|-----------|--------|
|    NP        |  yes      |  yes   |
|    CO-NP     |  no       |  yes   |
|    #P        |  no       |  yes   |
|    PSPACE    |  no       |  yes   |


NP - There exists a solution to a statement

CO-NP - Proving there are no solutions to a statement

#P - To count how many solutions exist to a statement

PSPACE  - Proving an alternation of different statements

### What is Zero Knowledge?

What a verifier can compute after an interaction is identical to what they could prove prior. The interaction over multiple rounds between the prover & verifier has not increased the computional power of the verifier.

**The Simulation Paradigm**

This experiment exists throughout cryptography. It presents a "Real View" & "Simulated View". 

Real View: All possible histories of interactions between Prover & Verifier (P,V)

Simulated View: The verifier simulates all possible interactions between Prover & Verifier 

![simulation paradigm](https://cdn.discordapp.com/attachments/860525418008674327/1070395090259947520/simulation.jpg  "Simulation Paradigm")

A polynomial-time distinguisher makes an attempt to determine whether they are looking at the real or simulated view and requests a sample from both repeatedly.

The two views are said to be "computationally indistinguishable" if for all distinguisger algorithms/strategies, even after receiving a polynomial number of samples from real or simulated, the probability is >1/2. 

**Zero-Knowledge Arguments of Knowledge**

An interactive protocol (P,V) is zero-knowledge if there exists a simulator (algorithm) such that for every probabilty polynomial-time verifier (when the theorem is correct), the probability distributions determining the real from simulated view are computationaly indistinguishable. 

Interactive Protocols are useful when there is a single verifier. An example would be a tax auditor in a zero-knowledge 'proof of taxes' application.

## What is a SNARK?

**Succinct Non-Interactive Argument of Knowledge**

Broad definition - A succinct proof that a statement is true. The proof must be short and fast to verify. In SNARKS a single message is sent from Prover to Verifier. The verifier can then choose to accept or reject. 

example statement: "I know a message (m) such that SHA256(m)=0"

In a zk-SNARK the proof reveals nothing about the message (m).

**Polynomials**: Sums of terms containing a constant (such as 1,2,3), variables (such as x,y,z), and exponents of variables (such as x², y³). 

example: "3x² + 8x + 17"

**Arithmetic Circuit**: A model for computing polynomials. More generally it can be defined as a Directed Acyclic Graph on which at each node of the graph an arithmetic operation is performed. The circuit consists of addition gates, multiplication gates and some constant gates. In the same way Boolean circuits carry bits in wires, Arithmetic circuits carry integers.

![circuit](https://cdn.discordapp.com/attachments/860525418008674327/1070405388048011305/circuit.jpg  "DAG")

In this example, the prover wants to convince the verifier that he knows a solution to the arithmetic circuit.  

**Commitments**: To do this, the prover will put all of the values (private and public) associated with the circuit into a commitment. Commitments hide their inputs by using a function whose output is irreversible.

Sha256 is one example of a hashing function that can be used in a commitment scheme.

After the prover commits to the values, the commitments are sent to verifier (being confident they are unable to uncover any of the original values). The prover is then able to show to the verifier knowledge of each of the values on the nodes of the graph. 

**Fiat-Shamir Transform**

To make the protocol *non-interactive* the prover generates randomness (used for the hidden challenge) on behalf of the verifier using a cryptographic hash function. This is known as the random oracle. The prover can then send a single message to the verifier who can then check it is correct. 

To form a SNARK that can be used for general circuits two elements are required:

Functional commitment scheme: Allows a committer to commit to a polynomial with a short string that can be used by a verifier to confirm claimed evaluations of the committed polynomial.

Polynomial interactive oracle: Verifier asks prover (algorithm) to open all commitments at various points of their choosing using polynomial commitment scheme & checks identity holds true between them.

**Setup**

Setup procedures help the verifier by summarizing a circuit & outputting public parameters. 

![Setup](https://cdn.discordapp.com/attachments/860525418008674327/1070395089899229245/setup.jpg  "Setup")

**Types of pre-processing setup**:

Trusted Setup per circuit - Is run once per circuit. Is sepcific to a circuit & the secret randomness (Common Reference String) must be kept secret + destroyed. 

A comprimised setup in this method means a dishonest prover can prove false statements. 

Trusted but Universal Setup - Only has to run trusted setup once and is able to then deterministically preprocess multiple circuits. 

Transparent Setup (No Trusted Setup)- The preprocessing algorithm does not use any secret randomness at all. 


**Types of SNARK proof constructions**:

[Groth16](https://www.youtube.com/watch?v=QDplVkyncYQ): Requires Trusted Setup but has very short proofs that can be verified quickly.

[Sonic](https://www.youtube.com/watch?v=oTRAg6Km1os)/[Marlin](https://www.youtube.com/watch?v=bJDLf8KLdL0)/[Plonk](https://cryptocurrencywiki.org/PLONK): Universally Trusted Setup.

[DARK](https://www.youtube.com/watch?v=_ZDM7NwSxEY)/[HALO](https://eprint.iacr.org/archive/2019/1021/20200218:011907)/[STARK](https://www.youtube.com/watch?v=wFZ_YIetK1o): No Trusted Setup but produce slightly longer proofs or may take longer for prover to run. 

SNARKS are useful when multiple verifiers are needed such as a blockchain like Zcash or zk-Rollup such as [Aztec](https://docs.aztec.network) so that multiple validating nodes don't have to interact over several rounds with each proof. 

## How are zk-SNARK's implemented in Zcash?

Generally zero-knowledge proofs are a tool to enforce honest behaviour in protocols without revealing any information. 

Zcash is a public blockchain that facilitates private transactions. zk-SNARK's are used to prove that a private transaction is valid within the network consensus rules without revealing any other details about the transaction. 

[Video Explainer](https://www.youtube.com/watch?v=Kx4cIkCY2EA) - In this lecture Ariel Gabizon provides descriptions of the Zcash Note Commitment Tree, Blind Polynomial Evaluation & Homomorphically Hidden Challenges and how they are implemented on the network. 

Read the [Halo2 book](https://zcash.github.io/halo2/index.html) for more information.

## Other Zero-Knowledge Applications 

zk-SNARKS provide several advantages in a variety of different applications. Let's take a look at some examples.

**Scalability**: This is achieved by 'Outsourcing Computation'. There is no strict need for zero-knowledge for an L1 chain to verify the work of an off-chain service. Transactions are not necessarily private on a zk-EVM.

The advantage of a proof based Rollup (zk-Rollup) service is to process a batch of hundreds/thousands of transactions & the L1 is able to verify a succinct proof that all transactions were processed correctly, scaling the networks transaction throughput by a factor of 100 or 1000.

![zkvm](https://cdn.discordapp.com/attachments/860525418008674327/1070395090612265000/zkvm.jpg  "ZKVM")

**Interoperability**: This is achieved on a zk-Bridge by 'locking' assets on a source chain and proving to the target chain the assets have been locked (proof of consensus).

**Compliance**: Projects such as [Espresso](https://www.espressosys.com/blog/decentralizing-rollups-announcing-the-espresso-sequencer) are able to prove that a private transaction is compliant with local banking laws without revealing the details of the transaction. 

**Fighting Disinformation**: Among several examples outside of blockchain & cryptocurrency, the use of proof generation on images that have been processed by news & media outlets to enable viewers to independently verify the source of an image and all operations performed on it. https://medium.com/@boneh/using-zk-proofs-to-fight-disinformation-17e7d57fe52f


____


Further Learning: 

[Zero-Knowledge Bibliography - a16z Crypto](https://a16zcrypto.com/zero-knowledge-canon/)

[zkSNARK's with Hanh Huynh Huu](https://www.youtube.com/watch?v=zXF-BDohZjk)

[Zcash: Halo 2 and SNARKs without Trusted Setups - Sean Bowe on Dystopia labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

[Zero knowledge Proofs with Avi Wigderson - Numberphile](https://youtu.be/5ovdoxnfFVc)

[Interactive Zero-Knowledge Proofs - Chainlink article](https://blog.chain.link/interactive-zero-knowledge-proofs/)

[Lecture 1: Introduction and History of ZKP - zklearning.org](https://www.youtube.com/watch?v=uchjTIlPzFo)

[Simple Explanation of Arithmetic Circuits - Medium](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)

[Scalability is Boring, Privacy is Dead: ZK-Proofs, What are They Good for?](https://www.youtube.com/watch?v=AX7eAzfSB6w)