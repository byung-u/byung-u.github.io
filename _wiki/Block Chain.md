---
layout  : wiki
title   : Block Chain
summary : Block Chain
date    : 2018-01-09 11:15:48 +0900
updated : 2018-01-22 09:03:19 +0900
tags    : blockchain
toc     : true
public  : true
parent  : Concept
latex   : false
---
* TOC
{:toc}


# 아직 작성중..

## 찾아본 계기
* 2016.10.20 블록체인관련 [Tech Planet 2016](http://readme.skplanet.com/?p=13174){:target="_blank"}에서의 발표를 이진석 (당시 CTO, 블로코)님께서 하시는데 거의 못 알아들음.
* 2017.09.08 함께일하는 동료 5명중 나를 뺀 4명이 비트코인 투자(<del>투기</del>)를 시작하며 권유.
  빗썸이란 곳은 가입하면 1000원을 준다길래 가입 후 200원 리플을 5개 사두고 관심을 끔.
  Blcok chain 기술마저 관심을 끄고 지냄.
* 2018.01.08 우연히 들어보니 20배가 올라서 가보니 1000 ➜ 약 21000원이 되어있음.
  * 돈이 생겼으니 버릴 수는 없고 [Bithumb API](https://www.bithumb.com/u1/US127){:target="_blank"}를 이용해서 
  자동으로 사고팔 기능을 구현해서 일단 시작.
  * 기왕 이렇게 된거 block chain 기술부터 확인해봐야겠다고 생각하고 확인 시작
  * Block chain 관련 서적을 사보기 전에 개념확인
 
## 정의
* The first blockchain was conceptualized in 2008 by an anonymous person or group known as Satoshi Nakamoto and implemented in 2009 as a core component of bitcoin where it serves as the public ledger for all transactions.[^1]
  * A Peer-to-Peer Electronic Cash System [^3]


* A blockchain, originally block chain, is a continuously growing list of records, called blocks, which are linked and secured using cryptography. Each block typically contains a hash pointer as a link to a previous block, a timestamp and transaction data.[^1]
* 근본적으로 분산 데이터 저장기술의 한 형태로, 지속적으로 변경되는 데이터를 모든 참여 노드에 기록한 변경 리스트로서 분산 노드의 운영자에 의한 임의 조작이 불가능하도록 고안되었다. 잘 알려진 블록체인의 응용사례는 암호화폐의 거래과정을 기록하는 탈중앙화된 전자장부로서 비트코인이 있다. 이 거래 기록은 의무적으로 암호화되고 블록체인 소프트웨어를 실행하는 컴퓨터상에서 운영된다. 비트코인을 비롯한 대부분의 암호화폐들이 블록체인 기술 형태에 기반하고 있다[^2]
* 관리 대상 데이터를 '블록'이라고 하는 소규모 데이터들이 P2P방식을 기반으로 생성된 체인 형태의 연결고리 기반 분산 데이터 저장환경에 저장되어 누구도 임의로 수정될 수 없고 누구나 변경의 결과를 열람할 수 있는 분산컴퓨팅 기술 기반의 데이터 위변조 방지 기술이다. 이는 근본적으로 분산 데이터 저장기술의 한 형태로, 지속적으로 변경되는 데이터를 모든 참여 노드에 기록한 변경 리스트로서 분산 노드의 운영자에 의한 임의 조작이 불가능하도록 고안되었다. [^5]
* 가장 활발히 사용되는 Bitcoin: The world’s first completely decentralized digital currency.[^4]

## Blockchain 코드 분석
* Daniel van Flymen님의 [Github Code](https://github.com/dvf/blockchain){:target="_blank"}
* 코드도 간격하고, 시험하기도 쉽습니다.

### 사용하는 라이브러리
* hash는 [hashlib](https://docs.python.org/3/library/hashlib.html){:target="_blank"} 사용 

```python
import hashlib

import json
from time import time
from urllib.parse import urlparse
from uuid import uuid4

import requests
from flask import Flask, jsonify, request
```

### 초기화
```python
class Blockchain:
    def __init__(self):
        self.current_transactions = []
        self.chain = []
        self.nodes = set()

        # Create the genesis block
        self.new_block(previous_hash='1', proof=100)
```
  * 여기서 genesis block에 대한 그림 (출처)[https://en.wikipedia.org/wiki/Blockchain]{:target="_blank"}
![Blocks]({{ site.url }}/wiki/img/blockchain.mmd.png?style=centerimg) 

{:.image-caption}
*Figure 1. Genesis, Main, Orphan block*

### 노드 등록
```python
    def register_node(self, address):
        """
        Add a new node to the list of nodes

        :param address: Address of node. Eg. 'http://194.168.0.5:5000'
        """

        parsed_url = urlparse(address)
        self.nodes.add(parsed_url.netloc)
```

### 신규 블록 생성
* Transaction
![Bitcoin Transaction]({{ site.url }}/wiki/img/bitcoin_SatochiNakamoto_pdf.png?style=centerimg) 

{:.image-caption}
*Figure 2. Chain concept*

* Timestamp
![Timestamp]({{ site.url }}/wiki/img/bitcoin_SatochiNakamoto_timeStamp.png?style=centerimg) 

{:.image-caption}
*Figure 3. Timestamp Server*

* Proof of work
![Proof]({{ site.url }}/wiki/img/bitcoin_SatochiNakamoto_proof.png?style=centerimg) 

{:.image-caption}
*Figure 4. Proof of Work*

```python
    def new_block(self, proof, previous_hash):
        """
        Create a new Block in the Blockchain

        :param proof: The proof given by the Proof of Work algorithm
        :param previous_hash: Hash of previous Block
        :return: New Block
        """

        block = {
            'index': len(self.chain) + 1,
            'timestamp': time(),
            'transactions': self.current_transactions,
            'proof': proof,
            'previous_hash': previous_hash or self.hash(self.chain[-1]),
        }

        # Reset the current list of transactions
        self.current_transactions = []

        self.chain.append(block)
        return block
```

### 신규 트랜잭션 생성
```python
    def new_transaction(self, sender, recipient, amount):
        """
        Creates a new transaction to go into the next mined Block

        :param sender: Address of the Sender
        :param recipient: Address of the Recipient
        :param amount: Amount
        :return: The index of the Block that will hold this transaction
        """
        self.current_transactions.append({
            'sender': sender,
            'recipient': recipient,
            'amount': amount,
        })

        return self.last_block['index'] + 1
```		

### Chain의 유효성 검사
* Simplified Payment Verification
![Simplified Payment Verification]({{ site.url }}/wiki/img/bitcoin_SatochiNakamoto_verification.png?style=centerimg) 

{:.image-caption}
*Figure 5. Simplified Payment Verification*

```python
    def valid_chain(self, chain):
        """
        Determine if a given blockchain is valid

        :param chain: A blockchain
        :return: True if valid, False if not
        """

        last_block = chain[0]
        current_index = 1

        while current_index < len(chain):
            block = chain[current_index]
            print(f'{last_block}')
            print(f'{block}')
            print("\n-----------\n")
            # Check that the hash of the block is correct
            if block['previous_hash'] != self.hash(last_block):
                return False

            # Check that the Proof of Work is correct
            if not self.valid_proof(last_block['proof'], block['proof']):
                return False

            last_block = block
            current_index += 1

        return True

    def proof_of_work(self, last_proof):
        """
        Simple Proof of Work Algorithm:
         - Find a number p' such that hash(pp') contains leading 4 zeroes, where p is the previous p'
         - p is the previous proof, and p' is the new proof
        """

        proof = 0
        while self.valid_proof(last_proof, proof) is False:
            proof += 1

        return proof

    @staticmethod
    def valid_proof(last_proof, proof):
        """
        Validates the Proof

        :param last_proof: Previous Proof
        :param proof: Current Proof
        :return: True if correct, False if not.
        """

        guess = f'{last_proof}{proof}'.encode()
        guess_hash = hashlib.sha256(guess).hexdigest()
        return guess_hash[:4] == "0000"
		
    @staticmethod
    def hash(block):
        """
        Creates a SHA-256 hash of a Block

        :param block: Block
        """

        # We must make sure that the Dictionary is Ordered, or we'll have inconsistent hashes
        block_string = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()
		
```

### 충돌확인
```python
    def resolve_conflicts(self):
        """
        This is our consensus algorithm, it resolves conflicts
        by replacing our chain with the longest one in the network.

        :return: True if our chain was replaced, False if not
        """

        neighbours = self.nodes
        new_chain = None

        # We're only looking for chains longer than ours
        max_length = len(self.chain)

        # Grab and verify the chains from all the nodes in our network
        for node in neighbours:
            response = requests.get(f'http://{node}/chain')

            if response.status_code == 200:
                length = response.json()['length']
                chain = response.json()['chain']

                # Check if the length is longer and the chain is valid
                if length > max_length and self.valid_chain(chain):
                    max_length = length
                    new_chain = chain

        # Replace our chain if we discovered a new, valid chain longer than ours
        if new_chain:
            self.chain = new_chain
            return True

        return False
```

### 마지막 블록정보 가져오기
```python
    @property
    def last_block(self):
        return self.chain[-1]
```


### Flask를 이용한 테스트 코드
```python

# Instantiate the Node
app = Flask(__name__)

# Generate a globally unique address for this node
node_identifier = str(uuid4()).replace('-', '')

# Instantiate the Blockchain
blockchain = Blockchain()


@app.route('/mine', methods=['GET'])
def mine():
    # We run the proof of work algorithm to get the next proof...
    last_block = blockchain.last_block
    last_proof = last_block['proof']
    proof = blockchain.proof_of_work(last_proof)

    # We must receive a reward for finding the proof.
    # The sender is "0" to signify that this node has mined a new coin.
    blockchain.new_transaction(
        sender="0",
        recipient=node_identifier,
        amount=1,
    )

    # Forge the new Block by adding it to the chain
    previous_hash = blockchain.hash(last_block)
    block = blockchain.new_block(proof, previous_hash)

    response = {
        'message': "New Block Forged",
        'index': block['index'],
        'transactions': block['transactions'],
        'proof': block['proof'],
        'previous_hash': block['previous_hash'],
    }
    return jsonify(response), 200


@app.route('/transactions/new', methods=['POST'])
def new_transaction():
    values = request.get_json()

    # Check that the required fields are in the POST'ed data
    required = ['sender', 'recipient', 'amount']
    if not all(k in values for k in required):
        return 'Missing values', 400

    # Create a new Transaction
    index = blockchain.new_transaction(values['sender'], values['recipient'], values['amount'])

    response = {'message': f'Transaction will be added to Block {index}'}
    return jsonify(response), 201


@app.route('/chain', methods=['GET'])
def full_chain():
    response = {
        'chain': blockchain.chain,
        'length': len(blockchain.chain),
    }
    return jsonify(response), 200


@app.route('/nodes/register', methods=['POST'])
def register_nodes():
    values = request.get_json()

    nodes = values.get('nodes')
    if nodes is None:
        return "Error: Please supply a valid list of nodes", 400

    for node in nodes:
        blockchain.register_node(node)

    response = {
        'message': 'New nodes have been added',
        'total_nodes': list(blockchain.nodes),
    }
    return jsonify(response), 201


@app.route('/nodes/resolve', methods=['GET'])
def consensus():
    replaced = blockchain.resolve_conflicts()

    if replaced:
        response = {
            'message': 'Our chain was replaced',
            'new_chain': blockchain.chain
        }
    else:
        response = {
            'message': 'Our chain is authoritative',
            'chain': blockchain.chain
        }

    return jsonify(response), 200


if __name__ == '__main__':
    from argparse import ArgumentParser

    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    # app.run(host='127.0.0.1', port=port)
    app.run(host='0.0.0.0', port=port)
```	

## 실제 시험
* 코드로도 알 수 있지만, 모르시겠다면 구현했던 사람이 포스팅한 글에 시험 방식에 대한 내용이 있습니다. 
  * [Learn Blockchains by Building One](https://hackernoon.com/learn-blockchains-by-building-one-117428612f46){:target="_blank"}
  * 참고로 step 3에 가면 있습니다.


## 참조
[^1]: [영문 위키백과](https://en.wikipedia.org/wiki/Blockchain){:target="_blank"}
[^2]: [연합뉴스 삼성SDS, 블록체인 사업 본격 추진…자체 플랫폼 개발](http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=101&oid=001&aid=0009167205){:target="_blank"}
[^3]: [Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf){:target="_blank"} 사토시 나카모토 (2008)
[^4]: [BITCOIN: A Primer for Policymakers](https://www.mercatus.org/system/files/Brito_BitcoinPrimer.pdf){:target="_blank"} 제리 브리토, 안드레아 카스트로(Jerry Brito and Andrea Castillo) (2013).
[^5]: [한글 위키백과](https://ko.wikipedia.org/wiki/%EB%B8%94%EB%A1%9D%EC%B2%B4%EC%9D%B8){:target="_blank"}

