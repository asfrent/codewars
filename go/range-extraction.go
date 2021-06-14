// https://www.codewars.com/kata/51ba717bb08c1cd60f00002f

package kata

import "fmt"
import "strings"

// This structure represents an [a, b) range.
type Range struct {
  a int
  b int
}

func NewRange(x int) Range {
  return Range {
    a: x,
    b: x + 1,
  }
}

func (r Range) CanExtendWith(x int) bool {
  return r.b == x;
}

func (r *Range) ExtendWith(x int) {
  r.b = x + 1;
}

func (r Range) String() string {
  if r.b == r.a + 1 {
    return fmt.Sprintf("%d", r.a)
  } else if r.b == r.a + 2 {
    return fmt.Sprintf("%d,%d", r.a, r.b - 1)
  } else {
    return fmt.Sprintf("%d-%d", r.a, r.b - 1)
  }
}

type Ranges []Range

func (r *Ranges) ExtendWith(x int) {
  if len(*r) == 0 {
    *r = append(*r, NewRange(x))
    return
  }
  if (*r)[len(*r) - 1].CanExtendWith(x) {
    (*r)[len(*r) - 1].ExtendWith(x)
    return
  }
  *r = append(*r, NewRange(x))
}

func (r Ranges) String() string {
  stringRanges := []string{}
  for i := 0; i < len(r); i++ {
    stringRanges = append(stringRanges, r[i].String())
  }
  return strings.Join(stringRanges, ",")
}

func Solution(list []int) string {
  r := Ranges{}
  for _, v := range(list) {
    fmt.Printf("%d\n", v)
    r.ExtendWith(v)
  }
  return r.String()
}
