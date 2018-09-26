/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
//Test suite contains all test
$(function() { 
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
    * allFeeds variable has been defined and that it is not
    * empty. 
    */
    it('are defined', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).toBeGreaterThan(0);
    });

    /* a test that loops through each feed
    * in the allFeeds object and ensures it has a URL defined
    * and that the URL is not empty.
    */
    it('check if feeds have a url defined and make sure they are not just an empty string', function(){
      allFeeds.forEach(feed => {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);        
      });
    }); 

    /* a test that loops through each feed
    * in the allFeeds object and ensures it has a name defined
    * and that the name is not empty.
    */
    it('every feed name is not empty', function () {
      allFeeds.forEach(feed => {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.empty;
      });          
    });
  });

   /* a new test suite named "The menu" */
  describe('The menu', function(){
    let menuIcon = $(".menu-icon-link");

    /* A test that ensures the menu element is
    * hidden by default. */
    it('The menu',function(){  
      expect($("body").hasClass("menu-hidden")).toBe(true);    
    });

    /* a test that ensures the menu changes
    * visibility when the menu icon is clicked.
    */

    it('on users click menu changes', function() {
      menuIcon.click();
      expect($("body").hasClass("menu-hidden")).toBe(false);
      menuIcon.click();
      expect($("body").hasClass("menu-hidden")).toBe(true);      
    })        
  });

  /* a new test suite named "Initial Entries" */
  describe('Initial Entries', function(){     

    /* A test that ensures when the loadFeed
    * function is called and completes its work, there is at least
    * a single .entry element within the .feed container.    
    */
   // beforeach makes sure it compiles first
    beforeEach(done => {
      loadFeed(0, done);
    }); 

    it(" 1 entry found after loadFeed was invoked and finished executing", function(){
      expect($(".feed .entry").length).not.toBe(0);
    });
  });

  /*a new test suite named "New Feed Selection" */
  describe('New Feed Selection', function(){
    let feedOne,
        feedTwo;

    // beforeach makes sure it compiles first
    beforeEach(done => {
      // first feed loaded
      loadFeed(0, function(){
        feedOne = $(".feed").html();
        done();
      });
      // second feed loaded 
      loadFeed(1, function(){
        feedTwo = $(".feed").html();
        done();
      })
    });

    /*a test that ensures when a new feed is loaded
    * by the loadFeed function that the content actually changes.          
    */
    it('content is changed after new feed is loaded', function(){
      expect(feedOne === feedTwo).toBe(false);
    });
  }); 
}());
