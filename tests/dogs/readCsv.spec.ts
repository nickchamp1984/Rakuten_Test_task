import fs from "node:fs";
import {parse} from "csv-parse/sync";
import {expect, test} from "@playwright/test";

// Create function for CSV -> JSON data conversion
export function csvToJson(filePath: string): any[] {
    const csvFile = fs.readFileSync(filePath);
    return parse(csvFile, {
        columns: true,
        skip_empty_lines: true,
    });
}

// Create JSON array of objects based on the provided CSV file
const csvData: string[] = csvToJson('2017.csv');

// Create a map with objects that have unique breeds
const uniqueBreedMap = new Map();
csvData.forEach(item => {
    // @ts-ignore
    const key = `${item.Breed}`
    if (!uniqueBreedMap.has(key)) {
        uniqueBreedMap.set(key, item)
    }
});

// Create a list of unique breeds without duplicates
const uniqueBreedsList = Array.from(uniqueBreedMap.values());

// Normalize the breed names by removing all white spaces and making them all lowercase
const uniqueBreeds = uniqueBreedsList.map(({Breed}) => Breed).toString().trim().replace(/\s/g, "").toLowerCase();

// Create list of licenses for unique breeds
const licences = uniqueBreedsList.map(({LicenseType}) => LicenseType).toString();

// Create list of unique dog names
const dogNamesMapObject = new Map();
csvData.forEach(item => {
    // @ts-ignore
    const key = `${item.DogName}`
    dogNamesMapObject.set(key, item)
});

const dogNamesObject = Array.from(dogNamesMapObject.values());
const dogNamesList = dogNamesObject.map(({DogName}) => DogName);

// Create full list of dog names
// @ts-ignore
const nicknames = csvData.map(item => item.DogName);

// Create array with count of each dog name
const dogNamesPopularity = nicknames.reduce((arr, i) => {
    if (arr.hasOwnProperty(i)) {
        arr[i] += 1;
    } else {
        arr[i] = 1;
    }
    return arr;
}, []);


// Test method is just for convenience of running the script
test('Print unique breeds and check their number', async ({}) => {
    expect(uniqueBreeds.length).toEqual(3460);
    console.log(uniqueBreeds);
    console.log(uniqueBreeds.length);
});

test('Print licences for unique breeds and check their number', async ({}) => {
    expect(licences.length).toEqual(9184);
    console.log(licences);
    console.log(licences.length);
});

test('Print dog names and check their number', async ({}) => {
    expect(dogNamesList.length).toEqual(5894);
    expect(nicknames.length).toEqual(21727);
    console.log(dogNamesPopularity);
    console.log(dogNamesPopularity.sort().slice(0, 4));
});
