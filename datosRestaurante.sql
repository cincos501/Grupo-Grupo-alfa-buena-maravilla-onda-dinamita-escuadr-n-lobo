USE [Cafeteria]
GO
SET IDENTITY_INSERT [dbo].[Clientes] ON 

INSERT [dbo].[Clientes] ([IdCliente], [Nombre], [Telefono], [Correo], [Password]) VALUES (1, N'Andrea González', N'987654321', N'andrea.gonzalez@example.com', N'hashedpassword1')
INSERT [dbo].[Clientes] ([IdCliente], [Nombre], [Telefono], [Correo], [Password]) VALUES (2, N'Luis Martínez', N'123456789', N'luis.martinez@example.com', N'hashedpassword2')
INSERT [dbo].[Clientes] ([IdCliente], [Nombre], [Telefono], [Correo], [Password]) VALUES (3, N'Carla Pérez', N'456789123', N'carla.perez@example.com', N'hashedpassword3')
INSERT [dbo].[Clientes] ([IdCliente], [Nombre], [Telefono], [Correo], [Password]) VALUES (4, N'Pedro Sánchez', N'789123456', N'pedro.sanchez@example.com', N'hashedpassword4')
INSERT [dbo].[Clientes] ([IdCliente], [Nombre], [Telefono], [Correo], [Password]) VALUES (5, N'María Torres', N'321654987', N'maria.torres@example.com', N'hashedpassword5')
INSERT [dbo].[Clientes] ([IdCliente], [Nombre], [Telefono], [Correo], [Password]) VALUES (6, N'Sofía Ramírez', N'654987321', N'sofia.ramirez@example.com', N'hashedpassword6')
INSERT [dbo].[Clientes] ([IdCliente], [Nombre], [Telefono], [Correo], [Password]) VALUES (7, N'Jorge Fernández', N'567890123', N'jorge.fernandez@example.com', N'hashedpassword7')
INSERT [dbo].[Clientes] ([IdCliente], [Nombre], [Telefono], [Correo], [Password]) VALUES (8, N'Claudia López', N'456789012', N'claudia.lopez@example.com', N'hashedpassword8')
INSERT [dbo].[Clientes] ([IdCliente], [Nombre], [Telefono], [Correo], [Password]) VALUES (9, N'Ricardo Gómez', N'789456123', N'ricardo.gomez@example.com', N'hashedpassword9')
INSERT [dbo].[Clientes] ([IdCliente], [Nombre], [Telefono], [Correo], [Password]) VALUES (10, N'Elena Castillo', N'987321654', N'elena.castillo@example.com', N'hashedpassword10')
SET IDENTITY_INSERT [dbo].[Clientes] OFF
GO
SET IDENTITY_INSERT [dbo].[Eventos] ON 

INSERT [dbo].[Eventos] ([IdEvento], [IdCliente], [Fecha], [Duracion], [Estado], [ClienteIdCliente]) VALUES (4, 2, CAST(N'2024-11-22T16:49:01.6300000' AS DateTime2), 50, N'Confirmado', 2)
INSERT [dbo].[Eventos] ([IdEvento], [IdCliente], [Fecha], [Duracion], [Estado], [ClienteIdCliente]) VALUES (5, 3, CAST(N'2024-11-22T16:00:00.0000000' AS DateTime2), 60, N'Cancelado', 3)
INSERT [dbo].[Eventos] ([IdEvento], [IdCliente], [Fecha], [Duracion], [Estado], [ClienteIdCliente]) VALUES (11, 6, CAST(N'2024-11-23T16:00:00.0000000' AS DateTime2), 60, N'Pendiente', 8)
INSERT [dbo].[Eventos] ([IdEvento], [IdCliente], [Fecha], [Duracion], [Estado], [ClienteIdCliente]) VALUES (15, 8, CAST(N'2024-11-22T17:24:45.1790000' AS DateTime2), 10, N'Cancelada', 8)
INSERT [dbo].[Eventos] ([IdEvento], [IdCliente], [Fecha], [Duracion], [Estado], [ClienteIdCliente]) VALUES (17, 10, CAST(N'2024-11-20T18:31:00.0000000' AS DateTime2), 60, N'Confirmado', 10)
SET IDENTITY_INSERT [dbo].[Eventos] OFF
GO
SET IDENTITY_INSERT [dbo].[Mesas] ON 

INSERT [dbo].[Mesas] ([IdMesa], [Capacidad], [Zona], [NumMesa]) VALUES (1, 2, N'Normal', 1)
INSERT [dbo].[Mesas] ([IdMesa], [Capacidad], [Zona], [NumMesa]) VALUES (2, 2, N'Normal', 2)
INSERT [dbo].[Mesas] ([IdMesa], [Capacidad], [Zona], [NumMesa]) VALUES (3, 6, N'Normal', 3)
INSERT [dbo].[Mesas] ([IdMesa], [Capacidad], [Zona], [NumMesa]) VALUES (4, 4, N'Normal', 4)
INSERT [dbo].[Mesas] ([IdMesa], [Capacidad], [Zona], [NumMesa]) VALUES (5, 2, N'VIP', 5)
INSERT [dbo].[Mesas] ([IdMesa], [Capacidad], [Zona], [NumMesa]) VALUES (6, 8, N'VIP', 6)
INSERT [dbo].[Mesas] ([IdMesa], [Capacidad], [Zona], [NumMesa]) VALUES (7, 4, N'VIP', 7)
INSERT [dbo].[Mesas] ([IdMesa], [Capacidad], [Zona], [NumMesa]) VALUES (8, 10, N'VIP', 8)
INSERT [dbo].[Mesas] ([IdMesa], [Capacidad], [Zona], [NumMesa]) VALUES (9, 2, N'Normal', 10)
SET IDENTITY_INSERT [dbo].[Mesas] OFF
GO
SET IDENTITY_INSERT [dbo].[Reservas] ON 

INSERT [dbo].[Reservas] ([IdReserva], [IdCliente], [IdMesa], [Fecha], [Duracion], [Estado], [ClienteIdCliente], [MesaIdMesa]) VALUES (8, 1, 2, CAST(N'2024-11-25T13:00:00.0000000' AS DateTime2), 2, N'Confirmada', 1, 2)
INSERT [dbo].[Reservas] ([IdReserva], [IdCliente], [IdMesa], [Fecha], [Duracion], [Estado], [ClienteIdCliente], [MesaIdMesa]) VALUES (9, 9, 6, CAST(N'2024-11-27T15:59:00.0000000' AS DateTime2), 1, N'Confirmada', 2, 3)
INSERT [dbo].[Reservas] ([IdReserva], [IdCliente], [IdMesa], [Fecha], [Duracion], [Estado], [ClienteIdCliente], [MesaIdMesa]) VALUES (10, 3, 4, CAST(N'2024-11-27T12:00:00.0000000' AS DateTime2), 1, N'Confirmada', 3, 4)
INSERT [dbo].[Reservas] ([IdReserva], [IdCliente], [IdMesa], [Fecha], [Duracion], [Estado], [ClienteIdCliente], [MesaIdMesa]) VALUES (13, 9, 6, CAST(N'2024-11-22T17:38:33.9466667' AS DateTime2), 90, N'Pendiente', 9, 6)
INSERT [dbo].[Reservas] ([IdReserva], [IdCliente], [IdMesa], [Fecha], [Duracion], [Estado], [ClienteIdCliente], [MesaIdMesa]) VALUES (14, 3, 4, CAST(N'2024-11-25T15:45:00.0000000' AS DateTime2), 30, N'Pendiente', 3, 4)
INSERT [dbo].[Reservas] ([IdReserva], [IdCliente], [IdMesa], [Fecha], [Duracion], [Estado], [ClienteIdCliente], [MesaIdMesa]) VALUES (15, 10, 5, CAST(N'2024-11-23T14:45:00.0000000' AS DateTime2), 1, N'Confirmada', 10, 5)
INSERT [dbo].[Reservas] ([IdReserva], [IdCliente], [IdMesa], [Fecha], [Duracion], [Estado], [ClienteIdCliente], [MesaIdMesa]) VALUES (16, 9, 2, CAST(N'2024-11-26T13:44:00.0000000' AS DateTime2), 1, N'Confirmada', 9, 2)
SET IDENTITY_INSERT [dbo].[Reservas] OFF
GO
SET IDENTITY_INSERT [dbo].[Platillos] ON 

INSERT [dbo].[Platillos] ([IdPlatillo], [Nombre], [Descripcion], [Precio], [Disponible]) VALUES (1, N'Café Americano', N'Café negro preparado con una proporción de agua caliente', CAST(15.00 AS Decimal(10, 2)), 1)
INSERT [dbo].[Platillos] ([IdPlatillo], [Nombre], [Descripcion], [Precio], [Disponible]) VALUES (2, N'Café con Leche', N'Café combinado con leche espumosa', CAST(18.00 AS Decimal(10, 2)), 1)
INSERT [dbo].[Platillos] ([IdPlatillo], [Nombre], [Descripcion], [Precio], [Disponible]) VALUES (3, N'Capuchino', N'Café con leche espumosa y espolvoreado con cacao', CAST(20.00 AS Decimal(10, 2)), 1)
INSERT [dbo].[Platillos] ([IdPlatillo], [Nombre], [Descripcion], [Precio], [Disponible]) VALUES (4, N'Latte', N'Café suave con leche vaporizada', CAST(22.00 AS Decimal(10, 2)), 1)
INSERT [dbo].[Platillos] ([IdPlatillo], [Nombre], [Descripcion], [Precio], [Disponible]) VALUES (5, N'Té Verde', N'Infusión de hojas de té verde', CAST(12.00 AS Decimal(10, 2)), 1)
INSERT [dbo].[Platillos] ([IdPlatillo], [Nombre], [Descripcion], [Precio], [Disponible]) VALUES (6, N'Brownie', N'Postre de chocolate con nueces', CAST(25.00 AS Decimal(10, 2)), 1)
INSERT [dbo].[Platillos] ([IdPlatillo], [Nombre], [Descripcion], [Precio], [Disponible]) VALUES (7, N'Tarta de Manzana', N'Tarta dulce con manzanas frescas', CAST(28.00 AS Decimal(10, 2)), 1)
INSERT [dbo].[Platillos] ([IdPlatillo], [Nombre], [Descripcion], [Precio], [Disponible]) VALUES (8, N'Baguette de Pollo', N'Baguette relleno de pollo, lechuga y mayonesa', CAST(30.00 AS Decimal(10, 2)), 1)
INSERT [dbo].[Platillos] ([IdPlatillo], [Nombre], [Descripcion], [Precio], [Disponible]) VALUES (9, N'Sándwich Vegetariano', N'Sándwich con tomate, lechuga, aguacate y mayonesa', CAST(18.00 AS Decimal(10, 2)), 1)
INSERT [dbo].[Platillos] ([IdPlatillo], [Nombre], [Descripcion], [Precio], [Disponible]) VALUES (10, N'Galletas de Avena', N'Galletas de avena y pasas, ideales para acompañar tu bebida', CAST(10.00 AS Decimal(10, 2)), 1)
SET IDENTITY_INSERT [dbo].[Platillos] OFF
GO
SET IDENTITY_INSERT [dbo].[Turnos] ON 

INSERT [dbo].[Turnos] ([IdTurno], [TipoTurno]) VALUES (1, N'Mañana')
INSERT [dbo].[Turnos] ([IdTurno], [TipoTurno]) VALUES (2, N'Tarde')
INSERT [dbo].[Turnos] ([IdTurno], [TipoTurno]) VALUES (3, N'Completo')
SET IDENTITY_INSERT [dbo].[Turnos] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuarios] ON 

INSERT [dbo].[Usuarios] ([IdUsuario], [Nombre], [Telefono], [Correo], [Username], [Password], [Rol]) VALUES (1, N'Carlos Pérez', N'123456789', N'carlos.perez@example.com', N'carlosp', N'hashedpassword1', N'Gerente')
INSERT [dbo].[Usuarios] ([IdUsuario], [Nombre], [Telefono], [Correo], [Username], [Password], [Rol]) VALUES (2, N'Ana López', N'987654321', N'ana.lopez@example.com', N'analopez', N'hashedpassword2', N'Cajero')
INSERT [dbo].[Usuarios] ([IdUsuario], [Nombre], [Telefono], [Correo], [Username], [Password], [Rol]) VALUES (3, N'Juan Ramírez', N'456789123', N'juan.ramirez@example.com', N'juanr', N'hashedpassword3', N'Cajero')
INSERT [dbo].[Usuarios] ([IdUsuario], [Nombre], [Telefono], [Correo], [Username], [Password], [Rol]) VALUES (4, N'Sofía Torres', N'654987321', N'sofia.torres@example.com', N'sofiat', N'hashedpassword4', N'Cajero')
INSERT [dbo].[Usuarios] ([IdUsuario], [Nombre], [Telefono], [Correo], [Username], [Password], [Rol]) VALUES (5, N'Luis Gómez', N'567890123', N'luis.gomez@example.com', N'luisg', N'hashedpassword5', N'Mesero')
INSERT [dbo].[Usuarios] ([IdUsuario], [Nombre], [Telefono], [Correo], [Username], [Password], [Rol]) VALUES (6, N'María Fernández', N'456789012', N'maria.fernandez@example.com', N'mariaf', N'hashedpassword6', N'Mesero')
INSERT [dbo].[Usuarios] ([IdUsuario], [Nombre], [Telefono], [Correo], [Username], [Password], [Rol]) VALUES (7, N'Pedro Sánchez', N'321654987', N'pedro.sanchez@example.com', N'pedros', N'hashedpassword7', N'Mesero')
INSERT [dbo].[Usuarios] ([IdUsuario], [Nombre], [Telefono], [Correo], [Username], [Password], [Rol]) VALUES (8, N'Diana Castillo', N'5', N'diana.castillo@example.com', N'dianac', N'hashedpassword8', N'Mesero')
INSERT [dbo].[Usuarios] ([IdUsuario], [Nombre], [Telefono], [Correo], [Username], [Password], [Rol]) VALUES (9, N'string', N'string', N'user@example.com', N'User@user.com', N'12345678asd', N'Mesero')
SET IDENTITY_INSERT [dbo].[Usuarios] OFF
GO
SET IDENTITY_INSERT [dbo].[AsignacionTurnos] ON 

INSERT [dbo].[AsignacionTurnos] ([IdAsignacion], [IdUsuario], [IdTurno], [FechaAsignacion]) VALUES (2, 3, 3, CAST(N'2024-11-22T04:19:09.2407653' AS DateTime2))
INSERT [dbo].[AsignacionTurnos] ([IdAsignacion], [IdUsuario], [IdTurno], [FechaAsignacion]) VALUES (3, 4, 1, CAST(N'2024-11-22T04:48:34.8351958' AS DateTime2))
INSERT [dbo].[AsignacionTurnos] ([IdAsignacion], [IdUsuario], [IdTurno], [FechaAsignacion]) VALUES (8, 2, 2, CAST(N'2024-11-22T05:21:03.7004933' AS DateTime2))
SET IDENTITY_INSERT [dbo].[AsignacionTurnos] OFF
GO
