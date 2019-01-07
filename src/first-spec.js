describe('A suit is just a function', function(){
    var a;
    it('and so is a spec', function(){
        a = true;
        expect(a).toBe(true);
    })
})

describe("A suite", function() {
    it("contains spec with an expectation", function() {
      expect(2+2).toBe(5);
    });
});
  

describe("The 'toBe' matcher compares with ===", function() {
    it("and has a positive case", function() {
        expect(true).toBe(true);
      });
      it("and can have a negative case", function() {
        expect(false).not.toBe(true);
      });
});
    
/**
 * A suite with some shared setup
 */
function beforeTest(){
    return 2;
}
describe("A suite with some shared setup", function() {
    var foo = 0;

    beforeEach(function() {
        foo += 1;
        // console.log('Setting up variables...'); // Will not get excecuted in Node??
        // alert('Setting up variables...');
      });

      afterEach(function() {
        foo = 0;
      });

      beforeAll(function() {
        foo = 1;
      });
        
      afterAll(function() {
        foo = 0;
      });

      it("should show the value of foo", function(){
          expect(foo).toBe(beforeTest());
      })
    
});
    
describe("A spec", function() {
    beforeEach(function() {
      this.foo = 0;
    });
    it("can use the `this` to share state", function() {
        expect(this.foo).toEqual(0);
        expect(this.name).toEqual('David');
        this.bar = "test pollution?";
    });

    it("Should have name defined", function(){
        expect(this.name).toEqual('David');        
    })

    it("prevents test pollution by having an empty `this` created for the next spec", function() {
        expect(this.foo).toEqual(0);
        // expect(this.bar).toBe(undefined); // Correct test
        // expect(this.bar).toBe(defined); // Invalid test
        expect(this.bar).not.toBe(undefined); // Correct tect
    });
    it("`this` is reset between each sped or `it`", function(){
        expect(this.name).toEqual(undefined);        
    })
});
describe("Next suit `this` is reset to empty", function(){
    it("should have reset `this` to empty", function(){
        // expect(this).toEqual({}); // will fail
        expect(this).toEqual(new Object()); // will fail
        expect(this.name).toBe(undefined);
    })
})


describe("Using async/await", function() {
    if (!browserHasAsyncAwaitSupport()) {
      return;
    }

    beforeEach(async function() {
        await soon();
        value = 0;
      });

      it("should support async execution of test preparation and expectations", async function() {
        await soon();
        value++;
        expect(value).toBeGreaterThan(0);
      });
});
    
/**
 * Manually failing
 */
describe("A spec using the fail function", function() {
    var foo = function(x, callBack) {
      if (x) {
        callBack();
      }
    };
  
    it("should not call the callBack", function() {
      foo(false, function() {
        fail("Callback has been called");
      });
    });
  });
  

  /**
   * Nesting describe Blocks
   * Calls to describe can be nested, with specs defined at any level. 
   * This allows a suite to be composed as a tree of functions. Before a spec is executed, 
   * Jasmine walks down the tree executing each beforeEach function in order. 
   * After the spec is executed, Jasmine walks through the afterEach functions similarly.
   */
  
describe("A spec", function() {
  var foo;

  beforeEach(function() {
    foo = 0;
    foo += 1;
    outer = 'Outer';
  });

  afterEach(function() {
    foo = 0;
  });

  it("is just a function, so it can contain any code", function() {
    expect(foo).toEqual(1);
  });

  it("can have more than one expectation", function() {
    expect(foo).toEqual(1);
    expect(true).toEqual(true);
  });

  /**
   * Nested describe
   */
  describe("nested inside a second describe", function() {
    var bar;

    beforeEach(function() {
      bar = 1;
      inner='Inner';
    });

    it("can reference both scopes as needed", function() {
        expect(foo).toEqual(bar);
      });

    it("can reference both scopes as needed", function() {
        expect(outer).not.toEqual(inner);
      });
  });
});

/**
 * Matchers
 */
describe('sorting the list of users', function() {
    beforeEach(function(){
        console.log('Before Each');
        this.sortUsers = function(input){
            return input.sort()
        }
    })
    it('sorts in descending order by default', function() {
      var users = ['jack', 'igor', 'jeff'];
      var sorted = this.sortUsers(users);
      expect(sorted).toEqual(['jeff', 'jack', 'igor']);
    });
  });
  
  /**
   * Unit Testing AngularJS Controller
   */
  describe('PasswordController', function() {
    beforeEach(module('app'));
  
    var $controller, $rootScope;
  
    beforeEach(inject(function(_$controller_, _$rootScope_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $controller = _$controller_;
      $rootScope = _$rootScope_;
    }));
  
    describe('$scope.grade', function() {
      it('sets the strength to "strong" if the password length is >8 chars', function() {
        var $scope = $rootScope.$new();
        var controller = $controller('PasswordController', { $scope: $scope });
        $scope.password = 'longerthaneightchars';
        $scope.grade();
        expect($scope.strength).toEqual('strong');
      });
    });
  });