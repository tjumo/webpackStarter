export const colorGenerator = () => {
    let red = Math.floor(Math.random()*256);
    let green = Math.floor(Math.random()*256);
    let blue = Math.floor(Math.random()*256);
    return [red,green,blue];
};

export const colorSimilarity = (red,green,blue,red2,green2,blue2) => {
    return (Math.abs(red-red2) * Math.abs(green-green2) * Math.abs(blue-blue2) < 5000 );
};

export const colorHashToNum = (hash) => {
    let red = parseInt(hash.substr(1,3),16);
    let green = parseInt(hash.substr(3,5),16);
    let blue = parseInt(hash.substr(5,7),16);
    return [red,green,blue];
};

export const colorNumToHash = (red,green,blue) => {
    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
};