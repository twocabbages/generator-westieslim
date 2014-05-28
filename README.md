# generator-westieslim
> [Yeoman](http://yeoman.io) generator.use Yeoman generator to generate PHP Slim App with Test Driver Development


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-westieslim from npm, run:

```
$ npm install -g generator-westieslim
```




### Go Starting

```
$ yo westieslim
```

```
$ cd ~/site;chmod -R 0777 tmp
```

request http://localhost.    success!

### Config PHPUnit

I use PHPStrom

1. PHPStorm\Preferances\PHP\PHPUnit\User Customer loader : /usr/local/bin/phpunit,
2. PHPStorm\Preferances\PHP\PHPUnit\default bootstrap file : ~/site/tests/bootstrap.
3. Run\Edit Configuration\+\PHPUnit\Directory :  ~/site/tests.
4. go run.

## Generate Model And Controller

### generate Model

```
$ yo westieslim:model "post" name:string telephone:integer status:integer
```
Because I use [Phinx](http://phinx.org/) so next let us generate mysql table.

The mysql config is in the phinx.yml.

```
$ php vendor/robmorgan/phinx/bin/phinx migrate -e development
```
Then Run test and test you app is right?

### generate Controller

```
$ yo westieslim:controller "post"
```

Then Run test and test you app is right?

### westieslim:Scaffold

```
$ yo westieslim:model "post" name:string telephone:integer status:integer
$ php vendor/bin/phinx migrate -e development
```

## License

MIT
