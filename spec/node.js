
require.paths.unshift('spec', '/Library/Ruby/Gems/1.8/gems/jspec-3.3.2/lib', 'lib')
require('jspec')
require('unit/spec.helper')
require('joq')

JSpec
  .exec('spec/unit/spec.js')
  .run({ reporter: JSpec.reporters.Terminal, fixturePath: 'spec/fixtures' })
  .report()
