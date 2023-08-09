const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
    output: process.stdout,
});

var history = [
    
]


    function chat(question) {
        // if (question == "finish") {
        //     console.log("Conversation successfully terminated.")
        //     return 0;
        // }
        history.push({ role: "user", content: question });
        return fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: history,
        }),
        })
        .then((res) => res.json())
        .then((data) => data.choices[0].message.content);
        
    }

    rl.prompt();
    
    rl.on("line", (question) => {
      chat(question).then((answer) => {
        console.log(`${answer}\n`);
        rl.prompt();
      });
    });
