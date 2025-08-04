//যা ঈ আর্গস হোক না কেনো , ফাংশন সব সময় রিটান করবে "Hello World"




/**
 * @return {Function}
 */
var createHelloWorld = function() {
    
    return function(...args) {
        return("Hello World")
        
    }
};

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */