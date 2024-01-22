const fs = require('fs');
const csv = require('csv-parser');
const output = [];

// Function to write data to a file
function writeToFile(fileName, data) {
    const stream = fs.createWriteStream(fileName, { flags: 'w' });
    // column name
    stream.write('country,year,population\n');  
    data.forEach(row => stream.write(`${row.country},${row.year},${row.population}\n`));
    stream.end();
}

//If they exists, delete canada.txt and usa.txt
['canada.txt', 'usa.txt'].forEach(file => {
    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
    }
});

fs.createReadStream('input_countries.csv')
    .pipe(csv())
    .on('data', (data) => output.push(data))
    .on('end', () => {
        const canada_Data = output.filter(row => row.country.toLowerCase() === 'canada');
        const usa_Data = output.filter(row => row.country.toLowerCase() === 'united states');
        writeToFile('canada.txt', canada_Data);
        writeToFile('usa.txt', usa_Data);

        console.log('Files have been successfully updated!');
    });
