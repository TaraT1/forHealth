# forHealth
When I dealt with one health provider, I did what they told me. As I moved to different cities, I cannot say I was mindful until something went wrong.

I became more attuned to the medical when I assisted my mother in her health journey.

Even though I have had treatments and vaccines and have taken prescriptions, I could not easily reconstruct that history or what I think about or what questions I may have for my provider or when I should have exams or vaccinations or innoculations. The need for being aware intensified when I helped my mother. And my wife. And my daugher. 

This forHealth app is to bring clarity and record history about health and medical care. 

- intention to assist in healthfulness, mindfulness
- navigating healthcare systems

It starts with adult self

Future functionality: 
- shared family /intimates information
- export for medical providers
- or ?

Security
- secure login
- ability to share info across accounts
- role based access control



# Install
`npm install`

---

# Add
.env file in config folder /config
PORT = 
DB_STRING = 

## Cloudinary Credentials
CLOUD_NAME = yourcloudinaryname
API_KEY = 
API_SECRET = 

# Run
`npm start`

- To run, activate database. (mongodb.com Ensure current ip address has access rights)

For production  `npm start` in terminal

## Dev
For dev, `npm run dev`

## cURL"
```javascript
curl -d {"name": "testName", "birthDate": "2023-01-01", "genderAssignedAtBirth": "female"} -H "Content-Type: application/json" -X POST http://localhost:2121/profiles/new ```

{
"name": "",
"birthDate": "",
"genderAssignedAtBirth": "",
"genderId": "",
"geneticBackground": "",
"eHealthRecords": "",
"journal:" "",
"todo": "",
"image": "",
"user": "",
"createdAt": "",
}

```
- not working "Unexpected end of JSON input"