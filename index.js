function Lazy(source) {
  return new Sequence(source);
}

function Sequence(source) {
  this.source = source;
}

Sequence.prototype.get = function () {
  var element;
  this.each(function (e, index) {
    if (index === i) {
      element = e;
      return false;
    }
  });
  return element;
};

Sequence.prototype.toArray = function toArray() {
  return this.reduce(function (arr, element) {
    arr.push(element);
    return arr;
  }, []);
};

Sequence.prototype.length = function length() {
  return this.source.length;
};

Sequence.prototype.reduce = function reduce(aggregator, memo) {
  this.each(function (e, i) {
    memo = aggregator(memo, e, i);
  });
  return memo;
};

Sequence.prototype.getIterator = function getIterator() {
  return new Iterator(this);
};

Sequence.prototype.each = function each(fn) {
  for (let i = 0; i < this.source.length; i++) {
    const e = this.source[i];
    fn(e, i);
  }
  return true;
};

Sequence.prototype.map = function map(mapFn) {
  return new MappedSequence(this, mapFn);
};

Sequence.prototype.filter = function filter(filterFn) {
  return new FilteredSequence(this, filterFn);
};

Sequence.prototype.get = function get(i) {
  return this.source[i];
};

Sequence.prototype.length = function length() {
  return this.source.length;
};

Sequence.prototype.take = function take(count) {
  return new TakeSequence(this, count);
};

function MappedSequence(parent, mapFn) {
  this.parent = parent;
  this.mapFn = mapFn;
}
MappedSequence.prototype = Object.create(Sequence.prototype);
MappedSequence.prototype.each = function each(fn) {
  var mapFn = this.mapFn;
  return this.parent.each(function (e, i) {
    return fn(mapFn(e, i), i);
  });
};

MappedSequence.prototype.length = function length() {
  return this.parent.length();
};

MappedSequence.prototype.get = function get(i) {
  var source = this.parent.source;
  return this.mapFn(source[i]);
};

function FilteredSequence(parent, filterFn) {
  this.parent = parent;
  this.filterFn = filterFn;
}
FilteredSequence.prototype = Object.create(Sequence.prototype);

FilteredSequence.prototype.each = function each(fn) {
  var parent = this.parent,
    length = parent.length(),
    filterFn = this.filterFn,
    i = -1;

  while (++i < length) {
    const e = parent.get(i);
    const filtered = filterFn(e, i);
    if (filtered) {
      fn(e, i);
    }
  }
  return true;
};
FilteredSequence.prototype.get = function get(i) {
  return this.parent.get(i);
};

function TakeSequence(parent, count) {
  this.parent = parent;
  this.count = count;
}
TakeSequence.prototype = Object.create(Sequence.prototype);
TakeSequence.prototype.each = function each(fn) {
  const count = this.count;
  let i = 0;
  let result;
  this.parent.each(function (e) {
    if (i < count) {
      result = fn(e, i++);
    }
    if (i >= count) {
      return false;
    }
    return result;
  });
  return i === count && result !== false;
};

module.exports = Lazy;
