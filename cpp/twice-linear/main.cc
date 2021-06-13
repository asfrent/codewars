//https://www.codewars.com/kata/5672682212c8ecf83e000050

#include <iostream>
#include <queue>
#include <unordered_set>
#include <vector>

class DoubleLinear {
public:
  static void
  add(int x, std::priority_queue<int, std::vector<int>, std::greater<int>> *q,
      std::unordered_set<int> *p) {
    if (p->find(x) == p->end()) {
      p->insert(x);
      q->push(x);
    }
  }

  static int
  top(std::priority_queue<int, std::vector<int>, std::greater<int>> *q,
      std::unordered_set<int> *p) {
    int x = q->top();
    q->pop();
    p->erase(x);
    return x;
  }

  static int dblLinear(int n) {
    std::priority_queue<int, std::vector<int>, std::greater<int>> q;
    std::unordered_set<int> p;
    add(1, &q, &p);
    int x;
    for (int i = 0; i <= n; ++i) {
      x = top(&q, &p);
      add(2 * x + 1, &q, &p);
      add(3 * x + 1, &q, &p);
    }
    return x;
  }
};