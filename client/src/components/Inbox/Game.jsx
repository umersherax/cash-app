import React from 'react'

export default function Game() {
  return (
    <div>
      <table className="mt-5">
        <tr>
          <td id="demo1">1</td>
          <td id="demo2">2</td>
          <td id="demo3"></td>
        </tr>
        <tr>
          <td id="demo4"></td>
          <td id="demo5"></td>
          <td id="demo6"></td>
        </tr>
        <tr>
          <td id="demo7"></td>
          <td id="demo8"></td>
          <td id="demo9"></td>
        </tr>
      </table>
      <br />
      <button id="result" className="st">
        In progress
      </button>
      <br />
      <br />
      <button id="new">New Game</button>
    </div>
  )
}
