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
end