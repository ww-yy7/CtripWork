let type =class {
    constructor()
    {this.name ="god"
    }
    static name ='man'
}
// console. log(type.name);
// console.log('test');

Promise.resolve ().then(()=>{
    throw new Error('err');
}).then((data)=>{
    console.info('then:',data);
}).catch((err)=>{
    console.info('catch:',err);
})