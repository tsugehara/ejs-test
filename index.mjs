import ejs from "ejs";
import * as fs from "fs";

function read() {
    return new Promise((resolve, reject) => {
        let header = null;
        let body = null;
        function finish() {
            if (header == null || body == null) return;
            resolve({
                header: header,
                body: body
            });
        }
        fs.readFile("./parts/b.ejs", { encoding: "utf8" }, (err, data) => {
            if (err) throw reject(err);
            header = data;
            finish();
        });
        fs.readFile("./a.ejs", { encoding: "utf8" }, (err, data) => {
            if (err) throw reject(err);
            body = data;
            finish();
        });
    })
}

read().then((obj) => {
    console.log(ejs.renderFile("a.ejs", {
        title: "hi",
    }, (err, data) => {
        console.log(data);
    }));
    /*
    const html = ejs.compile(obj.body, {
        filename: "a.ejs"
    });
    console.log(html());
    */
   /*
   const html = ejs.render(obj.body, {
       title: "hi"
   }, {filename: "a.ejs"});
   console.log(html);
   */
}).catch((err) => {
    console.error(err);
});