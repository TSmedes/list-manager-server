const { json } = require("express");
const fs = require("fs/promises")

async function ReadData(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    if(data != ''){
      JSON.parse(data);
    }
    return data;
  } 
  catch (error) {
    console.log(`Error reading file: ${error}`);
    return error;
  }
}

async function WriteData(filePath, dataOut) {
  try {
    fs.writeFile(filePath, JSON.stringify(dataOut));
  } 
  catch (error) {
    console.log(`Error writing file: ${error}`);
    return error;
  }
}

exports.ReadData = ReadData;
exports.WriteData = WriteData;