// @ts-nocheck

import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Avatar } from "../components/tailwindui/avatar";
import { Badge } from "../components/tailwindui/badge";
import { Divider } from "../components/tailwindui/divider";
import { Heading, Subheading } from "../components/tailwindui/heading";
import { Select } from "../components/tailwindui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/tailwindui/table";
import { getRecentOrders } from "../lib/data";
import { ApplicationLayout, Stat } from '../components/application-layout';

export const Route = createFileRoute('/dashboard')({
  component: DashboardComponent,
})

function DashboardComponent() {
	const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
		async function getOrders() {
      const data = await getRecentOrders();
      setOrders(data);
    };

		getOrders();
  }, []);

  return (
		<ApplicationLayout>
			<Heading>Good afternoon, Test</Heading>
			<div className="mt-8 flex items-end justify-between">
				<Subheading>Overview</Subheading>
				<div>
					<Select name="period">
						<option value="last_week">Last week</option>
						<option value="last_two">Last two weeks</option>
						<option value="last_month">Last month</option>
						<option value="last_quarter">Last quarter</option>
					</Select>
				</div>
			</div>
			<div>
				<a href="#">SignInWithGoogle</a>
			</div>
			<div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
				<Stat title="Total revenue" value="$2.6M" change="+4.5%" />
				<Stat title="Average order value" value="$455" change="-0.5%" />
				<Stat title="Tickets sold" value="5,888" change="+4.5%" />
				<Stat title="Pageviews" value="823,067" change="+21.2%" />
			</div>
			<Subheading className="mt-14">Recent orders</Subheading>
			<Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
				<TableHead>
					<TableRow>
						<TableHeader>Order number</TableHeader>
						<TableHeader>Purchase date</TableHeader>
						<TableHeader>Customer</TableHeader>
						<TableHeader>Event</TableHeader>
						<TableHeader className="text-right">Amount</TableHeader>
					</TableRow>
				</TableHead>
				<TableBody>
					{orders.map((order) => (
						<TableRow key={order.id} href={order.url} title={`Order #${order.id}`}>
							<TableCell>{order.id}</TableCell>
							<TableCell className="text-zinc-500">{order.date}</TableCell>
							<TableCell>{order.customer.name}</TableCell>
							<TableCell>
								<div className="flex items-center gap-2">
									<Avatar src={order.event.thumbUrl} className="size-6" />
									<span>{order.event.name}</span>
								</div>
							</TableCell>
							<TableCell className="text-right">US{order.amount.usd}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</ApplicationLayout>
  )
}
