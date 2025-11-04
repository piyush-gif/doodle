import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts";

const CostFunctionVisualization = () => {
  const [w, setW] = useState(10);
  const [b, setB] = useState(0);

  // Your data
  const sqfeet = [100, 200, 300, 400];
  const housePrices = [1, 2, 3, 4];

  // Calculate predictions and cost
  const calculatePredictions = () => {
    return sqfeet.map((x, i) => {
      const prediction = w * x + b;
      const actual = housePrices[i];
      const error = prediction - actual;
      const squaredError = error * error;

      return {
        x,
        actual,
        prediction,
        error: error.toFixed(2),
        squaredError: squaredError.toFixed(2),
      };
    });
  };

  const calculateCost = () => {
    const predictions = calculatePredictions();
    const sumSquaredErrors = predictions.reduce(
      (sum, p) => sum + parseFloat(p.squaredError),
      0
    );
    return (sumSquaredErrors / (2 * sqfeet.length)).toFixed(2);
  };

  // Generate line data for visualization
  const generateLineData = () => {
    const data = [];
    for (let x = 0; x <= 450; x += 50) {
      data.push({
        x,
        prediction: w * x + b,
      });
    }
    return data;
  };

  // Generate data points for scatter plot
  const actualData = sqfeet.map((x, i) => ({
    x,
    y: housePrices[i],
  }));

  const predictions = calculatePredictions();
  const cost = calculateCost();
  const lineData = generateLineData();

  // Generate cost surface data (how cost changes with different w values)
  const generateCostSurface = () => {
    const data = [];
    for (let testW = 0; testW <= 0.05; testW += 0.001) {
      let sumSquared = 0;
      for (let i = 0; i < sqfeet.length; i++) {
        const pred = testW * sqfeet[i] + b;
        const err = pred - housePrices[i];
        sumSquared += err * err;
      }
      const testCost = sumSquared / (2 * sqfeet.length);
      data.push({
        w: testW,
        cost: testCost,
      });
    }
    return data;
  };

  const costSurfaceData = generateCostSurface();

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Cost Function Visualization
      </h1>

      {/* Controls */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Adjust Parameters</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">
              Weight (w): <span className="text-blue-600">{w}</span>
            </label>
            <input
              type="range"
              min="0"
              max="0.05"
              step="0.001"
              value={w}
              onChange={(e) => setW(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-600 mt-1">Range: 0 to 0.05</div>
          </div>
          <div>
            <label className="block mb-2 font-medium">
              Bias (b): <span className="text-blue-600">{b}</span>
            </label>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.1"
              value={b}
              onChange={(e) => setB(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-600 mt-1">Range: -10 to 10</div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded border-2 border-blue-300">
          <div className="text-2xl font-bold text-center">
            Cost J(w,b) = <span className="text-red-600">{cost}</span>
          </div>
          <div className="text-center text-sm text-gray-600 mt-2">
            {parseFloat(cost) < 1
              ? "✅ Excellent fit!"
              : parseFloat(cost) < 100
              ? "⚠️ Decent fit"
              : "❌ Poor fit - adjust parameters!"}
          </div>
        </div>
      </div>

      {/* Visualization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Model Predictions vs Actual */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            Model Fit: Predictions vs Actual Data
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="x"
                label={{
                  value: "Square Feet",
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                label={{ value: "Price", angle: -90, position: "insideLeft" }}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="prediction"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Model Line"
                dot={false}
              />
              <Scatter data={actualData} fill="#ef4444" name="Actual Data" />
            </LineChart>
          </ResponsiveContainer>
          <div className="text-sm text-gray-600 mt-2">
            🔴 Red dots = actual data | 🔵 Blue line = model predictions
          </div>
        </div>

        {/* Right: Cost vs Weight */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Cost Function Surface</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={costSurfaceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="w"
                label={{
                  value: "Weight (w)",
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                label={{
                  value: "Cost J(w)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="cost"
                stroke="#8b5cf6"
                strokeWidth={2}
                name="Cost"
                dot={false}
              />
              <Scatter
                data={[{ w: w, cost: parseFloat(cost) }]}
                fill="#ef4444"
                name="Current w"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="text-sm text-gray-600 mt-2">
            🔴 Red dot = your current w value | Goal: reach the minimum (bottom
            of curve)
          </div>
        </div>
      </div>

      {/* Detailed Calculations */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-semibold mb-4">Detailed Calculations</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Square Feet (x)</th>
                <th className="p-2 text-left">Actual Price (y)</th>
                <th className="p-2 text-left">Prediction (ŷ)</th>
                <th className="p-2 text-left">Error (ŷ - y)</th>
                <th className="p-2 text-left">Squared Error</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((p, i) => (
                <tr key={i} className="border-b">
                  <td className="p-2">{p.x}</td>
                  <td className="p-2">{p.actual}</td>
                  <td className="p-2">{p.prediction.toFixed(2)}</td>
                  <td className="p-2 font-medium">{p.error}</td>
                  <td className="p-2 text-red-600 font-medium">
                    {p.squaredError}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded">
          <div className="font-mono text-sm">
            <div>
              Sum of Squared Errors ={" "}
              {predictions
                .reduce((sum, p) => sum + parseFloat(p.squaredError), 0)
                .toFixed(2)}
            </div>
            <div>Number of examples (m) = {sqfeet.length}</div>
            <div className="font-bold mt-2">
              Cost J(w,b) = (1 / 2m) × Sum = {cost}
            </div>
          </div>
        </div>
      </div>

      {/* Formula Explanation */}
      <div className="bg-blue-50 p-6 rounded-lg shadow-md mt-6 border-2 border-blue-200">
        <h3 className="text-lg font-semibold mb-3">
          Understanding the Cost Function
        </h3>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Model:</strong> f(w,b) = w × x + b
          </p>
          <p>
            <strong>Cost Function:</strong> J(w,b) = (1/2m) × Σ[f(w,b)(x⁽ⁱ⁾) -
            y⁽ⁱ⁾]²
          </p>
          <p className="mt-3">
            <strong>What it does:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Measures how far predictions are from actual values</li>
            <li>
              Squares errors to make them positive and penalize large errors
            </li>
            <li>Averages across all training examples</li>
            <li>
              <strong>Lower cost = better model fit</strong>
            </li>
          </ul>
          <p className="mt-3 font-semibold">
            🎯 Goal: Find w and b that minimize J(w,b)
          </p>
        </div>
      </div>
    </div>
  );
};

export default CostFunctionVisualization;
