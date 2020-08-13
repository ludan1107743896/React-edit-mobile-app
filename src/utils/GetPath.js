const GetPath = (path, index, isContainer) => {
    if(!path && index !== undefined && !isContainer){
        path = `[${index}]`
    } else if (path && isContainer) {
        path = `${path}.children`;
    } else if (path && index !== undefined) {
        path = `${path}.children.[${index}]`
    }
    return path;
}

export default GetPath;