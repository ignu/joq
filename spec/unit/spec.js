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
        cat.expects("pet").with(3).returns(function() {})
        cat.pet(3);
        Joq.errors().should.be_empty
      end
    end
  end
end