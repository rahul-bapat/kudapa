const yaml = require('js-yaml');

let data = null;

// vowels mapping
const kannadaVowels = {
    'ಅ': 'a', 'ಆ': 'ā', 'ಇ': 'i', 'ಈ': 'ī', 'ಉ': 'u', 'ಊ': 'ū', 'ಋ': 'ṛ', 'ಎ': 'e', 'ಏ': 'ē', 'ಐ': 'ai', 'ಒ': 'o', 'ಓ': 'ō', 'ಔ': 'au', 'ಅಂ': 'āŋ', 'ಅಃ': 'ah'
};

// Function to parse the phone attribute and collect only the vowels
function getVowels(phone) {
    const vowels = [];
    if (phone) {
        for (let i = 0; i < phone.length; i++) {
            if (Object.values(kannadaVowels).includes(phone[i])) {
                vowels.push(phone[i]);
            }
        }
    }
    return vowels;
}



const readAlarYmlFile = async () => {
    let data = [];
    try {
        const response = await fetch('/resources/alar.yml', {
            headers: {
                'Content-Type': 'text/yaml; charset=UTF-8',
            },
        });
        const text = await response.text();
        data = yaml.loadAll(text);
    } catch (error) {
        console.error('Error reading YAML file:', error);
    }
    return data;
};

export async function getMatchingWordList(inputVowels) {
    let results = [];
    let data;

    if (inputVowels && inputVowels.length > 0) {
        try {
            if (!data) {
                data = await readAlarYmlFile();
            }

            if (data && data.length > 0) {
                const inputFormat = inputVowels.join('');
                const words = data[0]
                    .map((item) => {
                        const phone = item.phone;
                        const entry = item.entry;

                        return { phone, entry };
                    })
                    .filter(Boolean);

                words.forEach((aWord) => {

                    if (getVowels(aWord.phone).join('') == inputFormat) {
                        results.push(aWord.entry);
                    }
                });
            }
        } catch (error) {
            console.error('Error retrieving word list:', error);
        }
    }

    return results;
}

