// const extractSubAfterPipe = (sub) => {
//     const subParts = sub.split('|');
//     if (subParts.length !== 2 || subParts[1].trim() === '') {
//         throw new Error('Invalid sub format');
//     }

//     return subParts[1].trim();
// };
const extractSubAfterPipe = (sub) => {
    if (sub && sub.includes('|')) {
        const subParts = sub.split('|');
        if (subParts.length !== 2 || subParts[1].trim() === '') {
            throw new Error('Subformato no válido');
        }
        return subParts[1].trim();
    }
    return sub;
};




module.exports= {extractSubAfterPipe};