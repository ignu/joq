describe "Joq"
  describe ".stubs()"
    describe ".returns()"
      before
        cat.stubs("meow").returns("MEOW!")
      end
      it "should return what was stubbed"        
        cat.meow().should_equal "MEOW!"
      end
      describe ".reset()"
        before
          Joq.reset();
        end
        it "should be able to remove stubs"     
          cat.meow().should_equal "meow"
        end
      end
    end
  end

  describe ".expects()"
    describe "with()"
      it "should not have errors when called with matching parameters"
        cat.expects("pet").with(3)
        cat.pet(3);
        Joq.errors().should.be_empty
      end

      it "should have error messages when not called with matching parameters"
        cat.expects("meow").with(4)
        Joq.errors().should_not.be_empty
        Joq.errors()[0].should.be "expected meow to be called"
      end

      it "should be able to remove expectations"
        cat.expects("meow")
        Joq.reset();
        cat.meow().should.be "meow"
        Joq.errors().length.should.be 0
      end
    end
  end
end