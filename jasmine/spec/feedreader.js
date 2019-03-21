/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    /* a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe("RSS Feeds", function() {
      /* it tests to make sure that the
       * allFeeds variable has been defined and that it is not
       * empty. Experiment with this before you get started on
       * the rest of this project. What happens when you change
       * allFeeds in app.js to be an empty array and refresh the
       * page?
       */
      it("feed array is defined and not empty", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /* test that loops through each feed
       * in the allFeeds object and ensures it has a URL defined
       * and that the URL is not empty.
       */
      it("All feeds have url defined and not empty", () => {
        allFeeds.forEach(feed => {
          expect(feed.url).toBeDefined();
          expect(feed.url).not.toBe("");
        });
      });

      /* test that loops through each feed
       * in the allFeeds object and ensures it has a name defined
       * and that the name is not empty.
       */
      it("All feeds have name defined and not empty", () => {
        allFeeds.forEach(feed => {
          expect(feed.name).toBeDefined();
          expect(feed.name).not.toBe("");
        });
      });
    });

    /* test suite named "The menu" */
    describe("The menu", function() {
      const body = document.querySelector("body");
      const menu_icon = document.querySelector(".menu-icon-link");

      /* test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */
      it("menu is hidden", () => {
        expect(body.classList.contains("menu-hidden")).toBe(true);
      });

      /* test that ensures the menu changes
       * visibility when the menu icon is clicked. This test
       * should have two expectations: does the menu display when
       * clicked and does it hide when clicked again.
       */
      it("slide trigger when clicked", () => {
        //the solution from Ben Cunnnigham @ https://github.com/Ul1ra/FeedReader
        menu_icon.click();
        expect(body.classList.contains("menu-hidden")).toBe(false);
        menu_icon.click();
        expect(body.classList.contains("menu-hidden")).toBe(true);
      });
    });
    /* test suite named "Initial Entries" */
    describe("Initial Entries", function() {
      /* test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */
      beforeEach(done => loadFeed(0, done));
      
      it("should get initial entries", function(done) {
        expect(document.querySelector(".feed .entry")).toBeDefined();
        done();
      });
    });

    /* test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {
      /* test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
      var feedOne, feedTwo;
      beforeEach(function(done) {
        loadFeed(0, () => {
          feedOne = document.querySelector(".feed").innerHTML;
          console.log('feedOne done');
          loadFeed(1, () => {
            feedTwo = document.querySelector(".feed").innerHTML;
            console.log('feedTwo done');
            done();
          });
        });
        
      });
      it("two feeds have different content", function(done) {
        expect(feedOne).not.toEqual(feedTwo);
        console.log(`feedOne: ${feedOne.length}, feedTwo: ${feedTwo.length}`);
        done();
      });
    });
  })()
);
