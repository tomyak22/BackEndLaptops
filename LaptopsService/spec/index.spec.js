let request = require("request");

const base_url = "http://localhost:3036/laptops/";
const team_url = base_url + "team/";
const laptops_url = base_url + "all/";

console.log("Starting tests");

describe("Tests for Laptops Server", () => {
    // Tests to make sure the team members show up correctly
    describe("GET / all members of the team", () => {
        it("returns status code 200", (done) => {
            request.get(team_url, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("contains the correct team members", (done) => {
            request.get(team_url, (error, response, body) => {
                expect(body).toBeTruthy();
                expect(body).toContain("Cameron Fournier");
                expect(body).toContain("Thomas Fenyak");
                expect(body).toContain("Nicholas Quinn");
                done();
            });
        });
        it("contains does not contain false", (done) => {
            request.get(team_url, (error, response, body) => {
                expect(body).toBeTruthy();
                expect(body).not.toContain("Braddy Brad");
                done();
            });
        });
    });


    // Tests for the laptops and prices with the correct City
    describe("GET / all laptops with correct prices", () => {
        it("returns status code 200", (done) => {
            request.get(laptops_url + "Raleigh", (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("returns status code 200", (done) => {
            request.get(laptops_url + "Durham", (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("returns status code 404 when not searching for valid city", (done) => {
            request.get(laptops_url + "Texas", (error, response, body) => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
        it("contains prices with Raleigh sales tax", (done) => {
            request.get(laptops_url + "Raleigh", (error, response, body) => {
                expect(body).toBeTruthy();
                expect(body).toContain("MacBook Air");
                expect(body).toContain("668.41");
                done();
            });
        });
        it("contains prices with Durham sales tax", (done) => {
            request.get(laptops_url + "Durham", (error, response, body) => {
                expect(body).toBeTruthy();
                expect(body).toContain("MacBook Air");
                expect(body).toContain("671.52");
                done();
            });
        });
    });
});