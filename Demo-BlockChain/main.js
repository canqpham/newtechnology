
const SHA256 = require('crypto-js/sha256'); // khai bao thu vien ma hoa

class Block { // lop khoi tao block
    constructor(index, timestamp, data, previousHash = ''){ // cac bien
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.caculateHash();
    }
    caculateHash(){ // ham chuyen du lieu thanh ma hash
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain { // tao các khối có liên kết với nhau
    constructor(){
        this.chain = [this.createGenesisBlock()];   // tạo khối thứ nhất
    }
    createGenesisBlock(){ // khởi tạo khối đầu tiên trong mảng
        return new Block(0,"23/11/2018", "Genesis block", "0")
    }

    getLatestBlock(){ // hàm get khối cuối cùng trong mảng
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){ // hàm thêm 1 khối vào trong mảng
        newBlock.previousHash = this.getLatestBlock().hash; // previousHash của khối này là hash của khối trước đó
        newBlock.hash = newBlock.caculateHash(); // tạo hash cho khối hiện tại
        this.chain.push(newBlock); // thêm thối vào trong mảng
    }

    isChainValid(){ // hàm kiểm tra khối có đc xác nhận hay không
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if(currentBlock.hash !== currentBlock.caculateHash()){ // so sanh hash hiện tại và hash hiện tại sau khi được hàm generate ra
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){ // so sánh previousHash hiện tại với hash của khối trước đó
                return false;
            }
        }
        return true;
    }
}

let myCoin = new Blockchain(); // khởi tạo 1 cuỗi blockchain ban đầu
myCoin.addBlock(new Block(1, "27/11/2018", { amount : 4 }));        // thêm 1 khối vào mảng
myCoin.addBlock(new Block(2, "28/11/2018", { amount : 10 }));       // thêm 1 khối vào mảng

console.log(JSON.stringify(myCoin, null, 4));                       // console mảng ra dưới định dạng JSON


console.log("Is blockchain valid?", myCoin.isChainValid());         // kiểm tra khối có đảm bảo an toàn không