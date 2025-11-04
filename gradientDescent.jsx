import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, ReferenceDot } from 'recharts';

const DerivativeVisualization = () => {
  const [xPoint, setXPoint] = useState(2);
  const [stepSize, setStepSize] = useState(0.5);
  const [functionType, setFunctionType] = useState('quadratic');

  // Define different functions
  const functions = {
    quadratic: {
      name: 'f(x) = x²',
      f: (x) => x * x,
      derivative: (x) => 2 * x,
      derivativeFormula: "f'(x) = 2x"
    },
    linear: {
      name: 'f(x) = 2x + 1',
      f: (x) => 2 * x + 1,
      derivative: (x) => 2,
      derivativeFormula: "f'(x) = 2"
    },
    cubic: {
      name: 'f(x) = x³',
      f: (x) => x * x * x,
      derivative: (x) => 3 * x * x,
      derivativeFormula: "f'(x) = 3x²"
    }
  };

  const currentFunc = functions[functionType];

  // Generate data for the main function
  const generateFunctionData = () => {
    const data = [];
    for (let x = -3; x <= 5; x += 0.1) {
      data.push({
        x: parseFloat(x.toFixed(2)),
        y: currentFunc.f(x)
      });
    }
    return data;
  };

  // Calculate derivative approximation
  const calculateApproxDerivative = () => {
    const y1 = currentFunc.f(xPoint);
    const y2 = currentFunc.f(xPoint + stepSize);
    const approxDerivative = (y2 - y1) / stepSize;
    return approxDerivative;
  };

  // Calculate actual derivative
  const actualDerivative = currentFunc.derivative(xPoint);
  const approxDerivative = calculateApproxDerivative();

  // Generate tangent line data
  const generateTangentLine = () => {
    const data = [];
    const y0 = currentFunc.f(xPoint);
    const slope = actualDerivative;
    
    for (let x = xPoint - 2; x <= xPoint + 2; x += 0.1) {
      const y = y0 + slope * (x - xPoint);
      data.push({ x, y });
    }
    return data;
  };

  // Generate secant line data (approximation line)
  const generateSecantLine = () => {
    const x1 = xPoint;
    const x2 = xPoint + stepSize;
    const y1 = currentFunc.f(x1);
    const y2 = currentFunc.f(x2);
    const slope = (y2 - y1) / (x2 - x1);
    
    return [
      { x: x1 - 1, y: y1 + slope * (-1) },
      { x: x1, y: y1 },
      { x: x2, y: y2 },
      { x: x2 + 1, y: y2 + slope * 1 }
    ];
  };

  const functionData = generateFunctionData();
  const tangentData = generateTangentLine();
  const secantData = generateSecantLine();

  const y1 = currentFunc.f(xPoint);
  const y2 = currentFunc.f(xPoint + stepSize);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">How Derivatives Work</h1>
      
      {/* Controls */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Interactive Controls</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div>
            <label className="block mb-2 font-medium">
              Function Type
            </label>
            <select 
              value={functionType}
              onChange={(e) => setFunctionType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="quadratic">Quadratic (x²)</option>
              <option value="linear">Linear (2x + 1)</option>
              <option value="cubic">Cubic (x³)</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Point x: <span className="text-blue-600">{xPoint.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="-2"
              max="4"
              step="0.1"
              value={xPoint}
              onChange={(e) => setXPoint(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Step Size (h): <span className="text-purple-600">{stepSize.toFixed(3)}</span>
            </label>
            <input
              type="range"
              min="0.01"
              max="2"
              step="0.01"
              value={stepSize}
              onChange={(e) => setStepSize(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-600 mt-1">
              Smaller step = better approximation
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50 rounded border-2 border-blue-200">
          <div>
            <div className="text-sm font-semibold text-gray-700">Approximate Derivative (Secant)</div>
            <div className="text-2xl font-bold text-purple-600">
              {approxDerivative.toFixed(4)}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              (y₂ - y₁) / h = ({y2.toFixed(3)} - {y1.toFixed(3)}) / {stepSize.toFixed(3)}
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-700">Actual Derivative (Tangent)</div>
            <div className="text-2xl font-bold text-green-600">
              {actualDerivative.toFixed(4)}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Using formula: {currentFunc.derivativeFormula}
            </div>
          </div>
        </div>

        <div className="mt-3 p-3 bg-yellow-50 rounded border border-yellow-200">
          <div className="text-sm">
            <strong>Difference:</strong> {Math.abs(approxDerivative - actualDerivative).toFixed(6)}
            {Math.abs(approxDerivative - actualDerivative) < 0.01 ? 
              " ✅ Very close!" : 
              " ⚠️ Try smaller step size"}
          </div>
        </div>
      </div>

      {/* Main Visualization */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Function: {currentFunc.name}
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="x" 
              type="number" 
              domain={[-3, 5]}
              label={{ value: 'x', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              domain={[-5, 25]}
              label={{ value: 'f(x)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip />
            <Legend />
            
            {/* Main function */}
            <Line 
              data={functionData} 
              type="monotone" 
              dataKey="y" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={false}
              name="f(x)"
            />
            
            {/* Tangent line (actual derivative) */}
            <Line 
              data={tangentData} 
              type="monotone" 
              dataKey="y" 
              stroke="#22c55e" 
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 5"
              name="Tangent (actual derivative)"
            />
            
            {/* Secant line (approximation) */}
            <Line 
              data={secantData} 
              type="monotone" 
              dataKey="y" 
              stroke="#a855f7" 
              strokeWidth={2}
              dot={false}
              name="Secant (approximation)"
            />
            
            {/* Mark the points */}
            <ReferenceDot 
              x={xPoint} 
              y={currentFunc.f(xPoint)} 
              r={6} 
              fill="#ef4444" 
              stroke="none"
            />
            <ReferenceDot 
              x={xPoint + stepSize} 
              y={currentFunc.f(xPoint + stepSize)} 
              r={6} 
              fill="#f97316" 
              stroke="none"
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 mr-2"></div>
            <span>Function f(x)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-1 bg-green-500 mr-2"></div>
            <span>Tangent (true slope)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-1 bg-purple-500 mr-2"></div>
            <span>Secant (approx slope)</span>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-3">Understanding What You See</h3>
        
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-blue-50 rounded">
            <strong className="text-blue-700">🔵 Blue Curve:</strong> The function {currentFunc.name}
          </div>
          
          <div className="p-3 bg-purple-50 rounded">
            <strong className="text-purple-700">🟣 Purple Line (Secant):</strong> Connects two points on the curve
            <div className="ml-4 mt-1">
              • Red dot at x = {xPoint.toFixed(2)}, f(x) = {y1.toFixed(3)}
              <br />
              • Orange dot at x = {(xPoint + stepSize).toFixed(2)}, f(x) = {y2.toFixed(3)}
              <br />
              • Slope = rise/run = {((y2 - y1) / stepSize).toFixed(4)}
            </div>
          </div>
          
          <div className="p-3 bg-green-50 rounded">
            <strong className="text-green-700">🟢 Green Dashed Line (Tangent):</strong> Just touches the curve at one point
            <div className="ml-4 mt-1">
              • This is the TRUE derivative at x = {xPoint.toFixed(2)}
              <br />
              • Slope = {actualDerivative.toFixed(4)}
              <br />
              • As step size → 0, purple line → green line!
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded border-2 border-yellow-300 mt-4">
            <strong>💡 Key Insight:</strong>
            <div className="mt-2">
              The derivative is the slope of the tangent line. We approximate it by calculating the slope between two close points (secant line). 
              <strong> As the step size gets smaller, our approximation gets closer to the true derivative!</strong>
            </div>
          </div>

          <div className="p-4 bg-gray-100 rounded mt-4">
            <strong>🎯 In Gradient Descent:</strong>
            <div className="mt-2">
              • The derivative tells us which way is "downhill"
              <br />
              • Positive slope → function increasing → go left (decrease parameter)
              <br />
              • Negative slope → function decreasing → go right (increase parameter)
              <br />
              • Steep slope → far from minimum → take big steps
              <br />
              • Gentle slope → close to minimum → take small steps
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DerivativeVisualization;