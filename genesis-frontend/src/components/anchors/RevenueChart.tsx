"use client";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

export default function RevenueChart({ auditData, tolerance, formatCurrency }: any) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={auditData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#1A2B3C" vertical={false} />
        <XAxis dataKey="name" stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 12, fontFamily: 'monospace' }} />
        <YAxis stroke="#6b7280" tickFormatter={formatCurrency} tick={{ fill: '#9ca3af', fontSize: 12, fontFamily: 'monospace' }} />
        <Tooltip 
          cursor={{ fill: 'rgba(26,43,60,0.3)' }}
          contentStyle={{ backgroundColor: '#0A0A0A', borderColor: '#1A2B3C', fontFamily: 'monospace', fontSize: '12px' }}
          formatter={(val: any, name: any) => [formatCurrency(Number(val)), name === 'captured' ? 'Captured Revenue' : 'Orphaned/Leaked']}
        />
        <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: '12px' }} />
        
        <Bar dataKey="captured" stackId="a" fill="#1A2B3C" name="Captured" />
        
        <Bar dataKey="leaked" stackId="a" name="Leaked">
          {auditData.map((entry: any, index: number) => {
            const leakPercentage = (entry.leaked / entry.total) * 100;
            const isCritical = leakPercentage > tolerance;
            return (
              <Cell 
                key={`cell-${index}`} 
                fill={isCritical ? '#D4AF37' : '#4b5563'} 
                stroke={isCritical ? '#ffffff' : 'transparent'}
                strokeWidth={isCritical ? 1 : 0}
              />
            );
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
